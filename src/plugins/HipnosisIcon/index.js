import IconAdd from './components/IconAdd.vue'
import IconArrowDown from './components/IconArrowDown.vue'
import IconArrowLeft from './components/IconArrowLeft.vue'
import IconArrowLeftD from './components/IconArrowLeftD.vue'
import IconArrowRight from './components/IconArrowRight.vue'
import IconArrowRightD from './components/IconArrowRightD.vue'
import IconArrowUp from './components/IconArrowUp.vue'
import IconBack from './components/IconBack.vue'
import IconCaretDown from './components/IconCaretDown.vue'
import IconCaretLeft from './components/IconCaretLeft.vue'
import IconCaretRight from './components/IconCaretRight.vue'
import IconCaretUp from './components/IconCaretUp.vue'
import IconCheck from './components/IconCheck.vue'
import IconClose from './components/IconClose.vue'
import IconCross from './components/IconCross.vue'
import IconEdit from './components/IconEdit.vue'
import IconExpand from './components/IconExpand.vue'
import IconFlag from './components/IconFlag.vue'
import IconFold from './components/IconFold.vue'
import IconFolder from './components/IconFolder.vue'
import IconFullScreen from './components/IconFullScreen.vue'
import IconList from './components/IconList.vue'
import IconMinus from './components/IconMinus.vue'
import IconPicture from './components/IconPicture.vue'
import IconPlay from './components/IconPlay.vue'
import IconPlus from './components/IconPlus.vue'
import IconRemove from './components/IconRemove.vue'
import IconSearch from './components/IconSearch.vue'
import IconSetting from './components/IconSetting.vue'

export default {
    install: (app, options) => {
        app.component('icon-add', IconAdd)
        app.component('icon-arrow-down', IconArrowDown)
        app.component('icon-arrow-left', IconArrowLeft)
        app.component('icon-arrow-left-d', IconArrowLeftD)
        app.component('icon-arrow-right', IconArrowRight)
        app.component('icon-arrow-right-d', IconArrowRightD)
        app.component('icon-arrow-up', IconArrowUp)
        app.component('icon-back', IconBack)
        app.component('icon-caret-down', IconCaretDown)
        app.component('icon-caret-left', IconCaretLeft)
        app.component('icon-caret-right', IconCaretRight)
        app.component('icon-caret-up', IconCaretUp)
        app.component('icon-check', IconCheck)
        app.component('icon-close', IconClose)
        app.component('icon-cross', IconCross)
        app.component('icon-edit', IconEdit)
        app.component('icon-expand', IconExpand)
        app.component('icon-flag', IconFlag)
        app.component('icon-fold', IconFold)
        app.component('icon-folder', IconFolder)
        app.component('icon-full-screen', IconFullScreen)
        app.component('icon-list', IconList)
        app.component('icon-minus', IconMinus)
        app.component('icon-picture', IconPicture)
        app.component('icon-play', IconPlay)
        app.component('icon-plus', IconPlus)
        app.component('icon-remove', IconRemove)
        app.component('icon-search', IconSearch)
        app.component('icon-setting', IconSetting)
    }
}