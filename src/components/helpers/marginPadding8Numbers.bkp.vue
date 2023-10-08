<template>
  <b-form-group
      label="Space"
  >
    <div class="margin-box" style="width: 260px; ">
      <div class="d-flex justify-content-between">
        <small class="text-muted input-xs small">Margin</small>

        <css-number
            v-model="value.marginTop"
            placeholder="Top" class="input-xs"
        />
        <!--            @input="(val) => addUnit(val, 'marginTop', 'unit')"-->
        <!--            :formatter="unitFormatter"-->
        <!--            lazy-formatter-->
        <div class="input-xs">
          <!--              <dropdowdropn-selector-->
          <!--                  v-model="temp.unit" class="float-right" size="xs" variant="dark" right :options="[-->
          <!--                  { value: 's', text: 'px' },-->
          <!--                  { value: 'em', text: 'em' },-->
          <!--                  { value: 'rem', text: 'rem' }]"-->
          <!--              />-->
        </div>
      </div>

      <div class="d-flex">
        <b-form-input
            v-model="value.marginLeft" type="text" size="sm"
            placeholder="Left" class="input-xs align-self-center"
        />

        <!-- Padding -->
        <div
            class="padding-box align-self-center"
            style="border: 3px solid #bbb;width:150px;border-radius: 10px;padding: 5px; margin:5px; "
        >
          <div class="d-flex justify-content-between">
            <div class="text-muted input-xs bg-grey m22t-1" style="font-size:.6rem">
              Padding
            </div>
            <b-form-input
                v-model="value.paddingTop" type="text" size="sm"
                placeholder="Top" class="input-xs"
            />
            <div class="input-xs"/>
          </div>

          <div class="d-flex justify-content-between">
            <b-form-input
                v-model="value.paddingLeft" type="text" size="sm"
                placeholder="Left" class="input-xs"
            />
            <b-form-input
                v-model="value.paddingRight" type="text" size="sm"
                placeholder="Right" class="input-xs"
            />
          </div>

          <div class="d-flex justify-content-center">
            <b-form-input
                v-model="value.paddingBottom" type="text" size="sm"
                placeholder="Bottom" class="input-xs"
            />
          </div>
        </div>

        <b-form-input
            v-model="value.marginRight" type="text" size="sm"
            placeholder="Right" class="input-xs align-self-center"
        />
      </div>

      <div class="d-flex justify-content-center">
        <b-form-input
            v-model="value.marginBottom" type="text" size="sm"
            placeholder="Bottom" class="input-xs"
        />
      </div>
    </div>
  </b-form-group>
</template>

<script>
export default {
  name: "marginPadding8Numbers.vue"
}
</script>

<style scoped>

</style>
