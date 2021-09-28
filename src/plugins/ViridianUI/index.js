import ViButton from './components/ViButton.vue'
import ViButtonGroup from './components/ViButtonGroup.vue'
import ViButtonNb from './components/ViButtonNb.vue'
import ViButtonSb from './components/ViButtonSb.vue'
import ViButtonSbSmall from './components/ViButtonSbSmall.vue'
import ViCard from './components/ViCard.vue'
import ViCardCompact from './components/ViCardCompact.vue'
import ViCardList from './components/ViCardList.vue'
import ViCardGrid from './components/ViCardGrid.vue'
import ViChip from './components/ViChip.vue'
import ViDialog from './components/ViDialog.vue'
import ViIcon from './components/ViIcon.vue'
import ViInput from './components/ViInput.vue'
import ViInputButton from './components/ViInputButton.vue'
import ViInputGroup from './components/ViInputGroup.vue'
import ViInputNum from './components/ViInputNum.vue'
import ViLabel from './components/ViLabel.vue'
import ViList from './components/ViList.vue'
import ViMenuButton from './components/ViMenuButton.vue'
import ViMenuOption from './components/ViMenuOption.vue'
import ViMenuSelect from './components/ViMenuSelect.vue'
import ViModal from './components/ViModal.vue'
import ViNavBar from './components/ViNavBar.vue'
import ViOption from './components/ViOption.vue'
import ViOptionGroup from './components/ViOptionGroup.vue'
import ViOverlay from './components/ViOverlay.vue'
import ViSectionContent from './components/ViSectionContent.vue'
import ViSectionHeader from './components/ViSectionHeader.vue'
import ViSelect from './components/ViSelect.vue'
import ViSwitch from './components/ViSwitch.vue'

export default {
    install: (app, options) => {
        app.component('vi-button', ViButton)
        app.component('vi-button-group', ViButtonGroup)
        app.component('vi-button-nb', ViButtonNb)
        app.component('vi-button-sb', ViButtonSb)
        app.component('vi-button-sb-small', ViButtonSbSmall)
        app.component('vi-card', ViCard)
        app.component('vi-card-compact', ViCardCompact)
        app.component('vi-card-list', ViCardList)
        app.component('vi-card-grid', ViCardGrid)
        app.component('vi-chip', ViChip)
        app.component('vi-dialog', ViDialog)
        app.component('vi-icon', ViIcon)
        app.component('vi-input', ViInput)
        app.component('vi-input-button', ViInputButton)
        app.component('vi-input-group', ViInputGroup)
        app.component('vi-input-num', ViInputNum)
        app.component('vi-label', ViLabel)
        app.component('vi-list', ViList)
        app.component('vi-menu-button', ViMenuButton)
        app.component('vi-menu-option', ViMenuOption)
        app.component('vi-menu-select', ViMenuSelect)
        app.component('vi-modal', ViModal)
        app.component('vi-nav-bar', ViNavBar)
        app.component('vi-option', ViOption)
        app.component('vi-option-group', ViOptionGroup)
        app.component('vi-overlay', ViOverlay)
        app.component('vi-section-content', ViSectionContent)
        app.component('vi-section-header', ViSectionHeader)
        app.component('vi-select', ViSelect)
        app.component('vi-switch', ViSwitch)
    }
}