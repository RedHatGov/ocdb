package masonry

import (
	"fmt"
	"github.com/opencontrol/compliance-masonry/pkg/lib/certifications"
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
	"io/ioutil"
)

type StandardSubset map[string]bool

type Certification struct {
	Key      string
	Controls map[string]StandardSubset
}

func (d *OpencontrolData) GetAllCertifications() map[string]Certification {
	return d.certificationsCache
}

func (d *OpencontrolData) buildCache() error {
	d.certificationsCache = map[string]Certification{}
	fileinfos, err := ioutil.ReadDir(d.certDir())
	if err != nil {
		return err
	}
	for _, fileinfo := range fileinfos {
		cert, err := certifications.Load(d.certDir() + fileinfo.Name())
		if err != nil {
			return err
		}
		controls := map[string]StandardSubset{}
		for _, name := range cert.GetSortedStandards() {
			controls[name], err = d.filterKeysInStandard(cert, name)
			if err != nil {
				return err
			}
		}

		d.certificationsCache[cert.GetKey()] = Certification{
			Key:      cert.GetKey(),
			Controls: controls,
		}
	}
	return nil
}

func (d *OpencontrolData) filterKeysInStandard(cert common.Certification, standardName string) (StandardSubset, error) {
	standard, found := d.workspace.GetStandard(standardName)
	if !found {
		return nil, fmt.Errorf("Did not found standard %s referenced by certification %s", standardName, cert.GetKey())
	}
	validControls := standard.GetControls()
	res := StandardSubset{}
	for _, ctrl := range cert.GetControlKeysFor(standardName) {
		_, found = validControls[ctrl]
		if found {
			res[ctrl] = true
		}
	}
	return res, nil
}

func (d *OpencontrolData) certDir() string {
	return d.cacheDir + "/certifications/"
}
