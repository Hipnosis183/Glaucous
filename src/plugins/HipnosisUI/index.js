import HipButton from './components/HipButton.vue'
import HipButtonGroup from './components/HipButtonGroup.vue'
import HipButtonNb from './components/HipButtonNb.vue'
import HipButtonSb from './components/HipButtonSb.vue'
import HipButtonSbSmall from './components/HipButtonSbSmall.vue'
import HipCard from './components/HipCard.vue'
import HipCardCompact from './components/HipCardCompact.vue'
import HipCardList from './components/HipCardList.vue'
import HipCardGrid from './components/HipCardGrid.vue'
import HipChip from './components/HipChip.vue'
import HipDialog from './components/HipDialog.vue'
import HipIcon from './components/HipIcon.vue'
import HipInput from './components/HipInput.vue'
import HipInputButton from './components/HipInputButton.vue'
import HipInputGroup from './components/HipInputGroup.vue'
import HipInputNum from './components/HipInputNum.vue'
import HipLabel from './components/HipLabel.vue'
import HipList from './components/HipList.vue'
import HipMenuButton from './components/HipMenuButton.vue'
import HipMenuOption from './components/HipMenuOption.vue'
import HipMenuSelect from './components/HipMenuSelect.vue'
import HipModal from './components/HipModal.vue'
import HipNavBar from './components/HipNavBar.vue'
import HipOption from './components/HipOption.vue'
import HipOptionGroup from './components/HipOptionGroup.vue'
import HipOverlay from './components/HipOverlay.vue'
import HipSectionContent from './components/HipSectionContent.vue'
import HipSectionHeader from './components/HipSectionHeader.vue'
import HipSelect from './components/HipSelect.vue'
import HipSwitch from './components/HipSwitch.vue'

export default {
    install: (app, options) => {
        app.component('hip-button', HipButton)
        app.component('hip-button-group', HipButtonGroup)
        app.component('hip-button-nb', HipButtonNb)
        app.component('hip-button-sb', HipButtonSb)
        app.component('hip-button-sb-small', HipButtonSbSmall)
        app.component('hip-card', HipCard)
        app.component('hip-card-compact', HipCardCompact)
        app.component('hip-card-list', HipCardList)
        app.component('hip-card-grid', HipCardGrid)
        app.component('hip-chip', HipChip)
        app.component('hip-dialog', HipDialog)
        app.component('hip-icon', HipIcon)
        app.component('hip-input', HipInput)
        app.component('hip-input-button', HipInputButton)
        app.component('hip-input-group', HipInputGroup)
        app.component('hip-input-num', HipInputNum)
        app.component('hip-label', HipLabel)
        app.component('hip-list', HipList)
        app.component('hip-menu-button', HipMenuButton)
        app.component('hip-menu-option', HipMenuOption)
        app.component('hip-menu-select', HipMenuSelect)
        app.component('hip-modal', HipModal)
        app.component('hip-nav-bar', HipNavBar)
        app.component('hip-option', HipOption)
        app.component('hip-option-group', HipOptionGroup)
        app.component('hip-overlay', HipOverlay)
        app.component('hip-section-content', HipSectionContent)
        app.component('hip-section-header', HipSectionHeader)
        app.component('hip-select', HipSelect)
        app.component('hip-switch', HipSwitch)
    }
}