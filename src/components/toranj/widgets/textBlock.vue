<!--<template>-->
<!--    <div-->
<!--        v-on-clickaway="clickAway"-->
<!--        :class="{'toranj-hover-widget': hover && !selected,'toranj-selected-widget': selected}"-->
<!--        @mouseover="(options.edit) ? hover = true : ''"-->
<!--        @mouseleave="hover = false"-->
<!--        @click.stop="selected=true"-->
<!--    >-->
<!--        <div-->
<!--            v-show="hover"-->
<!--            class="toranj-menu-widget"-->
<!--        >-->
<!--            <b-dropdown-->
<!--                :key="index + 'btn'"-->
<!--                size="sm"-->
<!--                variant="secondary"-->
<!--                right-->
<!--                bou2ndary="window"-->
<!--            >-->
<!--                <template slot="text">-->
<!--                    <slot name="text">-->
<!--                        &lt;!&ndash;our own slot!&ndash;&gt;-->
<!--                        <span class="icon-ellipsis-vert"/>-->
<!--                    </slot>-->
<!--                </template>-->
<!--                <b-dropdown-item @click="Add(toBeAdded)">-->
<!--                    add widget-->
<!--                </b-dropdown-item>-->
<!--                <b-dropdown-item @click="Delete">-->
<!--                    Del widget-->
<!--                </b-dropdown-item>-->
<!--                <b-dropdown-item @click="Duplicate">-->
<!--                    Duplicate widge-->
<!--                </b-dropdown-item>-->
<!--            </b-dropdown>-->

<!--            <b-btn-->
<!--                class="widget-drag-handler"-->
<!--                size="sm"-->
<!--            >-->
<!--                M-->
<!--            </b-btn>-->
<!--        </div>-->

<!--        <div-->
<!--            v-if="!options.edit && block.html"-->
<!--            v-html="block.html"-->
<!--        />-->

<!--        <template v-if="options.edit">-->
<!--            <client-only>-->
<!--                &lt;!&ndash;value&ndash;&gt;-->
<!--                <i-quill-->
<!--                    :content="block.html"-->
<!--                    :options="{theme: 'bubble',placeholder: 'TYPE', modules: {toolbar: [['bold', 'italic', 'underline', 'strike'],-->
<!--                                                                              [{ 'list': 'ordered'}, { 'list': 'bullet' }],-->
<!--                                                                              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],-->
<!--                                                                              [{ 'color': [] }, { 'background': [] }],-->
<!--                                                                              [{ 'font': [] }],-->
<!--                                                                              [{ 'align': [] }],-->
<!--                                                                              ['link', 'image'],-->
<!--                                                                              ['clean']]}}"-->
<!--                    class=""-->
<!--                    @edit="val => block.html = val"-->
<!--                >-->
<!--                    &lt;!&ndash;<template v-if="value">{{value}}</template>&ndash;&gt;-->
<!--                    &lt;!&ndash;<template v-else>&ndash;&gt;-->
<!--                    &lt;!&ndash;slot&ndash;&gt;-->
<!--                    &lt;!&ndash;<slot></slot>&ndash;&gt;-->
<!--                    &lt;!&ndash;</template>&ndash;&gt;-->
<!--                </i-quill>-->
<!--            </client-only>-->
<!--        </template>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    // import fMixin from './fMixin'-->
<!--    import blockMixin from '../blockMixin'-->

<!--    const iQuill = () => import('../../helpers/iQuill.vue')-->

<!--    export default {-->
<!--        mixins: [blockMixin],-->
<!--        components: {iQuill},-->

<!--        data() {-->
<!--            return {-->
<!--                hover: false,-->
<!--                addButtonhover: false,-->
<!--                toBeAdded: {-->
<!--                    component: 'text',-->
<!--                    html: 'just added '-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--        ,-->

<!--        created() {-->
<!--        }-->
<!--        ,-->
<!--        methods: {}-->
<!--    }-->
<!--</script>-->

<!--<style>-->

<!--</style>-->
