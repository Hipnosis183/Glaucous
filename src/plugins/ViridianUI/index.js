import ViButton from './components/ViButton.vue'
import ViButtonNb from './components/ViButtonNb.vue'
import ViButtonSb from './components/ViButtonSb.vue'
import ViButtonSettings from './components/ViButtonSettings.vue'
import ViButtonUI from './components/ViButtonUI.vue'
import ViCard from './components/ViCard.vue'
import ViCardCompact from './components/ViCardCompact.vue'
import ViCardList from './components/ViCardList.vue'
import ViCardGrid from './components/ViCardGrid.vue'
import ViChip from './components/ViChip.vue'
import ViChipUI from './components/ViChipUI.vue'
import ViDialog from './components/ViDialog.vue'
import ViDialogBox from './components/ViDialogBox.vue'
import ViIcon from './components/ViIcon.vue'
import ViInput from './components/ViInput.vue'
import ViInputButton from './components/ViInputButton.vue'
import ViInputGroup from './components/ViInputGroup.vue'
import ViInputNum from './components/ViInputNum.vue'
import ViLabel from './components/ViLabel.vue'
import ViList from './components/ViList.vue'
import ViListDialog from './components/ViListDialog.vue'
import ViListSearch from './components/ViListSearch.vue'
import ViMenuButton from './components/ViMenuButton.vue'
import ViMenuOption from './components/ViMenuOption.vue'
import ViMenuOptionUI from './components/ViMenuOptionUI.vue'
import ViMenuSelect from './components/ViMenuSelect.vue'
import ViMenuSelectUI from './components/ViMenuSelectUI.vue'
import ViModal from './components/ViModal.vue'
import ViNavBar from './components/ViNavBar.vue'
import ViOption from './components/ViOption.vue'
import ViOptionUI from './components/ViOptionUI.vue'
import ViOptionGroup from './components/ViOptionGroup.vue'
import ViOptionGroupUI from './components/ViOptionGroupUI.vue'
import ViOverlay from './components/ViOverlay.vue'
import ViSectionContent from './components/ViSectionContent.vue'
import ViSectionHeader from './components/ViSectionHeader.vue'
import ViSelect from './components/ViSelect.vue'
import ViSelectUI from './components/ViSelectUI.vue'
import ViSwitch from './components/ViSwitch.vue'

export default {
    install: (app, options) => {
        app.component('vi-button', ViButton)
        app.component('vi-button-nb', ViButtonNb)
        app.component('vi-button-sb', ViButtonSb)
        app.component('vi-button-settings', ViButtonSettings)
        app.component('vi-button-ui', ViButtonUI)
        app.component('vi-card', ViCard)
        app.component('vi-card-compact', ViCardCompact)
        app.component('vi-card-list', ViCardList)
        app.component('vi-card-grid', ViCardGrid)
        app.component('vi-chip', ViChip)
        app.component('vi-chip-ui', ViChipUI)
        app.component('vi-dialog', ViDialog)
        app.component('vi-dialog-box', ViDialogBox)
        app.component('vi-icon', ViIcon)
        app.component('vi-input', ViInput)
        app.component('vi-input-button', ViInputButton)
        app.component('vi-input-group', ViInputGroup)
        app.component('vi-input-num', ViInputNum)
        app.component('vi-label', ViLabel)
        app.component('vi-list', ViList)
        app.component('vi-list-dialog', ViListDialog)
        app.component('vi-list-search', ViListSearch)
        app.component('vi-menu-button', ViMenuButton)
        app.component('vi-menu-option', ViMenuOption)
        app.component('vi-menu-option-ui', ViMenuOptionUI)
        app.component('vi-menu-select', ViMenuSelect)
        app.component('vi-menu-select-ui', ViMenuSelectUI)
        app.component('vi-modal', ViModal)
        app.component('vi-nav-bar', ViNavBar)
        app.component('vi-option', ViOption)
        app.component('vi-option-ui', ViOptionUI)
        app.component('vi-option-group', ViOptionGroup)
        app.component('vi-option-group-ui', ViOptionGroupUI)
        app.component('vi-overlay', ViOverlay)
        app.component('vi-section-content', ViSectionContent)
        app.component('vi-section-header', ViSectionHeader)
        app.component('vi-select', ViSelect)
        app.component('vi-select-ui', ViSelectUI)
        app.component('vi-switch', ViSwitch)
    }
}