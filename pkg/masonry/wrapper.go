package masonry

import (
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
)

type OpencontrolData struct {
	workspace common.Workspace
	cacheDir  string
}

func (d *OpencontrolData) GetAllComponents() []common.Component {
	return d.workspace.GetAllComponents()
}

func (d *OpencontrolData) GetComponent(id string) (common.Component, bool) {
	return d.workspace.GetComponent(id)
}

func (d *OpencontrolData) GetAllStandards() []common.Standard {
	return d.workspace.GetAllStandards()
}

func (d *OpencontrolData) GetStandard(id string) (common.Standard, bool) {
	return d.workspace.GetStandard(id)
}
