// import {get as objGet, forEach, isFunction, isString, isArray, debounce, uniqueId} from "lodash";
import objGet from 'lodash/get'
import forEach from 'lodash/forEach'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'

// import  isArray from "lodash/isArray";
import debounce from 'lodash/debounce'

// import {evaluate, evaluateStringInterpolation} from 'bcx-expression-evaluator';
// import formulaFunctions from './formulaFunctions'
// import validators from "vue-form-generator/src/utils/validators";
// import { slugifyFormID } from "vue-form-generator/utils/schema";

const commonSettings = {
  component: 'form',
  children: [

    {
      slug: 'label',
      label: 'Label',
      component: 'input-text',
      required: true,
      description: '',

    },

    {
      slug: 'required',
      label: 'Required?',
      component: 'checkbox',
      // 'required': true,
      default: false, // not 1 or 0 or these things just true or false
      description: '',
    },

    { // maybe it's html?
      slug: 'description',
      label: 'Description',
      component: 'input-text',
      required: false,
      description: 'Add an example or help text',
    },

    {
      slug: 'slug',
      label: 'Slug',
      // 'type': 'email',
      prepend: 'Slug Name: ',
      component: 'slug',
      required: true,
      description: '<span style="color:orange">Caution:</span> You lose this data if there is a saved record for this field.',
      lower: false,
      separator: '_',
    },

    {
      slug: 'default',
      label: 'Default Value',
      component: 'input-text',
      type: 'text',
      description: 'Default value for empty field use ${} for formula. e.g. ${abs(-100)} or use @{} for reactive live value e.g. @{aFieldSlug + 10} or use a combination @{slice(myFieldSlug,0,5)}_${randomString(2)}',
      showIf: { slug: 'useFormula', op: 'eq', value: false },

    },

    // {
    //     'slug': 'useFormula',
    //     'label': 'Enable Autofill',
    //     'component': 'checkbox',
    //     default: false,
    //     // 'required': true,
    //     'description': '',
    // },
    // {
    //     'slug': 'formula',
    //     'label': 'Dynamic Data',
    //     'component': 'input-text',
    //     // 'required': true,
    //     'type': 'text',
    //     'description': 'Enter variable from the scope',
    //     "showIf": {"slug": "useFormula", op: 'neq', "value": false},
    // },

    {
      slug: 'showIf',
      label: 'Show only if:',
      component: 'show-if',
      // 'required': true,
      // 'type': 'text',
      description: 'Enter formula to show the field conditionally e.g. aFieldSlug > 10',
      // "showIf": {"slug": "useFormula", op: 'neq', "value": false},
    },
  ],
}

function emptyObject(obj) {
  return Object.values(obj).every(x => (x === null || x === '' || (Array.isArray(x) && !x.length)))
}

// function convertValidator(validator) {
//   if (isString(validator)) {
//     if (validators[validator] != null) return validators[validator];
//     else {
//       console.warn(`'${validator}' is not a validator function!`);
//       return null; // caller need to handle null
//     }
//   }
//   return validator;
// }

function attributesDirective(el, binding, vnode) {
  let attrs = objGet(vnode.context, 'schema.attributes', {})
  const container = binding.value || 'input'
  if (isString(container))
    attrs = objGet(attrs, container) || attrs

  forEach(attrs, (val, key) => {
    el.setAttribute(key, val)
  })
}

export default {
  // props: [ "model"],
  // props: ["vfg", "model", "schema", "formOptions", "disabled", 'index', 'errors', 'earray'],
  // data as prop cause serious issues
  // props: ['block', 'parent', 'index', 'options', 'model'], //parent can be an array or object with children same as action menus
  props: {
    block: {
      type: Object,
      default: () => {
      },
    },
    parent: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object,
      default: () => {
      },
    },
    type: {
      type: Object,
      // default: () => {
      // }
    },
    model: {
      type: Object,
      default: () => {
      },
    },
    scope: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      // errors: [],
      debouncedValidateFunc: null,
      showIf: null, // debounce func
      calculate: null, // debounced func
      // hasFormulaDefault: false,
      hasReactiveDefault: false,
      id: (!this.options || !this.options.id) ? 1 : this.options.id,
      tempErrors: this.errors || {},
      schema: {},
      defaultReactiveFormula: '',
      commonSettings,
      computeTimeout: false,
      isDirty: false,
      hasInitialValue: false,
      // calculatedValue: null,
    }
  },

  directives: {
    attributes: {
      // bind: attributesDirective,
      // updated: attributesDirective,
      // componentUpdated: attributesDirective
    },
  },

  watch: {

    'scope': { // maybe only watching model is require? or delay getting computing scope for 1000 or so or set a time out to avoid model quick changing cache them
      deep: true,
      handler(newVal) {
        this.calculateFormula(this.block.formula)

        if (this.hasReactiveDefault && !this.hasInitialValue)
          this.calculateDefault()
        // this.calculatedValue = ''
      },
    },

    'model': {
      deep: true,
      handler(newVal) {
        // console.log('model changed')
        this.calculateFormula(this.block.formula)

        if (this.hasReactiveDefault && !this.hasInitialValue)
          this.calculateDefault()
        // this.calculatedValue = ''
      },
    },

    'block.useFormula': function (newVal, oldVal) {
      if (newVal)
        this.calculateFormula(this.block.formula)
    },
  },
  mounted() {
    // IMPORTANT: Added By Hassan to fix losing focus when multiple forms working on an empty object (when schema loaded directly to props not using variable)
    // if (typeof this.value === 'undefined' )
    //     this.value = ''

    // hassan experimental
    // if (typeof this.value === 'undefined' && this.schema.default)
    //     this.value = this.schema.default

  },
  created() {
    this.schema = this.block

    this.hasInitialValue = true
    if (typeof this.value === 'undefined' || this.value === null) // zero ? string? object?
      this.hasInitialValue = false

    // console.log('field mixin',  this.schema)s

    // todo: add watchers after initial value not allow to repeat it again and again in start using a timeout or something
    // still not optimized and perfect
    this.calculate = debounce(this.calculateValueLive, 200) // not isolated only for this component but works for all

    if (this.block.default && !this.hasInitialValue && this.block.default.toString().includes('@{')) {
      // first calculate simple default then formulized reactive value
      setTimeout(() => { // wait to load some data
        this.hasReactiveDefault = true
        this.defaultReactiveFormula = this.$helper.evaluate(this.block.default, true, this.model, this.scope, this.block.asNumber) //
        console.log('step 1', this.defaultReactiveFormula)
        // use this one for other reactive
        this.defaultReactiveFormula = this.defaultReactiveFormula.toString().replaceAll('@{', '${')
        console.log('step 2', this.defaultReactiveFormula)
      }, 1300) // should be sooner than 1500 we calculate final formula, wait for initial load and model loading then calculate default
    }
    console.log('hsasreactive', this.hasReactiveDefault)

    if (!this.hasInitialValue && this.schema.slug) { // testing to enable object value work without certain defination slug means its kind of form element (another way to do this is doing it only for that specific component that needs object value)
      setTimeout(() => {
        this.calculateDefault() // initial for both hasformulaDefault and static default
      }, 1500) // wait for scope to be loaded

      this.calculateFormula(this.block.formula) // if there is formula / and it is prirotized to default
      // console.warn(this.block.useFormula, this.block.formula, this.calculate(this.block.formula))
    }

    //  changed schema.model to schema.slug
    // this.$root.$on('validate::' + this.id, (gIndex = '') => {
    //
    //     if (!gIndex) {// all
    //         this.Validate()
    //         // console.log('recieved all')
    //     } else if (gIndex == 'group__' + this.groupIndex) {
    //         // console.log('recieved validate command index:' + gIndex + ' thisis:' + 'group__' + this.groupIndex)
    //         this.Validate()
    //
    //     }//only this group
    // })
  },

  computed: {
    isView() {
      if (this.options.view)
        return true

      if (this.options.choosePermissions)
        return false

      if (Array.isArray(this.options.readOnlyFields) && this.options.readOnlyFields.includes(this.block.id))
        return true

      // if (Array.isArray(this.options.readOnlyFields) && this.options.readOnlyFields.includes(this.block.slug))
      //     return true

      return false
    },

    showViewLabels() {
      return typeof this.options.showViewLabels === 'undefined' ? true : this.options.showViewLabels
    },

    value: {
      cache: false,
      get() {
        let val

        // console.log('geting  ' + this.schema.slug)

        if (isFunction(objGet(this.schema, 'get')))
          val = this.schema.get(this.model)
        else
          val = objGet(this.model, this.schema.slug)

        return this.formatValueToField(val)
      },

      set(newValue) {
        const oldValue = this.value
        newValue = this.formatValueToModel(newValue)

        if (isFunction(newValue))
          newValue(newValue, oldValue)
        else
          this.updateModelValue(newValue, oldValue)
      },
    },
  },

  methods: {
    calculateDefault() {
      // console.log('calcuulate def')
      if (this.schema.default && !this.hasInitialValue && !this.options.edit && !this.options.choosePermissions) { // do not show default on edit page
        if (!this.isDirty) { // if has reactive formula use that
          this.calculate(this.defaultReactiveFormula || this.schema.default, true)
        }
      }
    },

    calculateFormula() {
      if ((this.block.useFormula || this.block.component == 'hidden') && this.block.formula && !this.options.edit && !this.options.choosePermissions) // do not show default on edit page
        this.calculate(this.block.formula)
    },

    calculateValueLive(formula, asString = false) {
      if (this.block.disableAllFormula)
        this.value = formula
      else
        this.value = this.$helper.evaluate(formula, asString, this.model, this.scope, this.block.asNumber)
    },

    ShowIf(block) {
      // console.log(field.model)
      // id or slug
      if (this.options.edit)
        return true

      if (Array.isArray(this.options.hiddenFields) && !this.options.choosePermissions) { // for fields
        if (this.options.hiddenFields.includes(block.id))
          return false

        // if (block.slug && this.options.hiddenFields.includes(block.slug)) only id not slug
        //     return false
      }

      // console.log('   block.showIf00', block.showIf)

      // hide empty fields for view

      if (this.options.hideEmptyFields && this.isView && (this.value === '' || (Array.isArray(this.value) && !this.value.length)))
        return false

      if (!block.hasOwnProperty('showIf'))
        return true

      if (typeof block.showIf === 'string' || (block.showIf && block.showIf.formula)) {
        // this.calculate = debounce(this.calculateValueLive, 200) //does not work with return value
        // \not isolated only for this component but works for all
        // performance: debounce it
        if (block.showIf === '')
          return true

        return this.$helper.evaluate(block.showIf || block.showIf.formula, null, this.model, this.scope)
      }

      if (block.showIf && block.showIf.slug && !block.showIf.formula)
        block.showIf = [block.showIf] // make it an array

      // console.log('   block.showIf', block.showIf)

      if (Array.isArray(block.showIf) || Array.isArray(block.showIf.rules)) {
        // console.log('   block.showIf 33', block.showIf)

        let result = true
        const rules = Array.isArray(block.showIf) ? block.showIf : block.showIf.rules

        rules.forEach((rule, index) => {
          const currentValue = objGet(this.model, rule.slug) // instead this.data[field.showIf.slug]
          // currentValue = currentValue.toString().toLowerCase() //undefined and nan and number may cause problem
          // rule.value = rule.value.toString().toLowerCase()
          if ((!rule.op || rule.op.toLowerCase() == 'eq') && typeof currentValue !== 'undefined' && currentValue != rule.value)
            result = false

          // console.log(rule.slug)
          // console.log(currentValue, rule.op, rule.value)

          if ((rule.op && rule.op.toLowerCase() == 'neq') && (typeof currentValue === 'undefined' || currentValue == rule.value))
            result = false
        })

        return result
      }

      // else boolean or string or so
      return block.showIf
    },
    hasError() {
      return (Array.isArray(this.tempErrors[this.schema.slug]) && this.tempErrors[this.schema.slug].length)
    },
    Validate() {
      const messages = []
      this.$set(this.tempErrors, this.schema.slug, [])
      // todo: bring show if and require if not hided
      if (this.schema.required) {
        if (isString(this.value))
          this.value = this.value.trim()

        // console.log('checboxx', this.value)
        // console.log(isEmpty(this.value))
        if ((!this.value && this.value !== 0) || (Array.isArray(this.value) && !this.length) || (isObject(this.value) && emptyObject(this.value)))
          messages.push(this.$t('form.require'))
        // this.$set(this.compo_messages, this.schema.model, 'requie')
      }

      switch (this.schema.component) {
        case 'text':
        case 'long-text':
          if (this.value && this.value.length < this.schema.min)
            messages.push(this.$t('form.tooShortText'))

          if (this.value && this.value.length > this.schema.max)
            messages.push(this.$t('form.tooLongText'))

          break

        case 'number':
        case 'number2':
          if ((this.value || this.value === 0) && this.value < this.schema.min)
            messages.push(this.$t('form.tooSmallNum'))

          if ((this.value || this.value === 0) && this.value.length > this.schema.max)
            messages.push(this.$t('form.tooBigNum'))

          break

        case 'checklist' :
        case 'tags' : // what about defined or so?
        case 'users' :

          if (Array.isArray(this.value) && this.value.length < this.schema.min)
            messages.push(this.$t('form.chooseMore'))

          if (Array.isArray(this.value) && this.value.length > this.schema.max)
            messages.push(this.$t('form.chooseLess'))

          break
                // is email alpha code number  locals  is interger
      }

      this.$set(this.tempErrors, this.schema.slug, messages)

      // console.log('id', this.id)
      this.$root.$emit(`validated::${this.id}`, this.tempErrors)

      this.$emit('update:errors', this.tempErrors) // all errors update sync parameter

      //   this.compo_messages = Object.assign({}, this.compo_messages, temp )
    },
    // validate(calledParent) {
    //   this.clearValidationErrors();
    //   let validateAsync = objGet(this.formOptions, "validateAsync", false);
    //
    //   let results = [];
    //
    //   if (this.schema.validator && this.schema.readonly !== true && this.disabled !== true) {
    //     let validators = [];
    //     if (!isArray(this.schema.validator)) {
    //       validators.push(convertValidator(this.schema.validator).bind(this));
    //     } else {
    //       forEach(this.schema.validator, validator => {
    //         validators.push(convertValidator(validator).bind(this));
    //       });
    //     }
    //
    //     forEach(validators, validator => {
    //       if (validateAsync) {
    //         results.push(validator(this.value, this.schema, this.model));
    //       } else {
    //         let result = validator(this.value, this.schema, this.model);
    //         if (result && isFunction(result.then)) {
    //           result.then(err => {
    //             if (err) {
    //               this.errors = this.errors.concat(err);
    //             }
    //             let isValid = this.errors.length === 0;
    //             this.$emit("validated", isValid, this.errors, this);
    //           });
    //         } else if (result) {
    //           results = results.concat(result);
    //         }
    //       }
    //     });
    //   }
    //
    //   let handleErrors = errors => {
    //     let fieldErrors = [];
    //     forEach(errors, err => {
    //       if (isArray(err) && err.length > 0) {
    //         fieldErrors = fieldErrors.concat(err);
    //       } else if (isString(err)) {
    //         fieldErrors.push(err);
    //       }
    //     });
    //     if (isFunction(this.schema.onValidated)) {
    //       this.schema.onValidated.call(this, this.model, fieldErrors, this.schema);
    //     }
    //
    //     let isValid = fieldErrors.length === 0;
    //     if (!calledParent) {
    //       this.$emit("validated", isValid, fieldErrors, this);
    //     }
    //     this.errors = fieldErrors;
    //     return fieldErrors;
    //   };
    //
    //   if (!validateAsync) {
    //     return handleErrors(results);
    //   }
    //
    //   return Promise.all(results).then(handleErrors);
    // },
    //
    // debouncedValidate() {
    //   if (!isFunction(this.debouncedValidateFunc)) {
    //     this.debouncedValidateFunc = debounce(
    //       this.validate.bind(this),
    //       objGet(this, "$parent.options.validateDebounceTime", 500)
    //     );
    //   }
    //   this.debouncedValidateFunc();
    // },

    updateModelValue(newValue, oldValue) {
      let changed = false
      if (isFunction(this.schema.set)) {
        this.schema.set(this.model, newValue)
        changed = true
      }
      else if (this.schema.slug) {
        this.setModelValueByPath(this.schema.slug, newValue)
        changed = true
      }
      if (changed) {
        this.$emit('model-updated', newValue, this.schema.slug)

        if (isFunction(this.schema.onChanged))
          this.schema.onChanged.call(this, this.model, newValue, oldValue, this.schema)

        // if (objGet(this.$parent, "options.validateAfterChanged", false) === true) {
        //   if (objGet(this.$parent, "options.validateDebounceTime", 0) > 0) {
        //     this.debouncedValidate();
        //   } else {
        //     this.validate();
        //   }
        // }
      }
    },

    // clearValidationErrors() {
    //   this.errors.splice(0);
    // },

    setModelValueByPath(path, value) {
      // convert array indexes to properties
      let s = path.replace(/\[(\w+)\]/g, '.$1')

      // strip a leading dot
      s = s.replace(/^\./, '')

      let o = this.model
      const a = s.split('.')
      let i = 0
      const n = a.length
      while (i < n) {
        const k = a[i]
        if (i < n - 1) {
          if (o[k] !== undefined && o[k] !== null) {
            // && o[k] !==null hassan for {settings:
            // Found parent property. Step in
            o = o[k]
          }
          else {
            // Create missing property (new level)
            this.$root.$set(o, k, {})
            o = o[k]
          }
        }
        else {
          // Set final property value
          if (typeof o === 'undefined' || o === null) { // hassan for undefined model because of unloaded data
            o = {}
            console.warn('undefined in ', o, k, value)
          }

          this.$root.$set(o, k, value)
          return
        }

        ++i
      }
    },

    getFieldID(schema, unique = false) {
      // const idPrefix = objGet(this.formOptions, "fieldIdPrefix", "");
      // return slugifyFormID(schema, idPrefix) + (unique ? "-" + uniqueId() : "");
      return `field-${this.schema.slug.replaceAll('.', '_')}`
    },

    getFieldClasses() {
      return objGet(this.schema, 'fieldClasses', [])
    },

    formatValueToField(value) {
      return value
    },

    formatValueToModel(value) {
      return value
    },
  },
}
