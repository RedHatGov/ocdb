package masonry

import (
	"github.com/opencontrol/compliance-masonry/pkg/lib/certifications"
	"io/ioutil"
)

type StandardSubset []string

type Certification struct {
	Key      string
	Controls map[string]StandardSubset
}

func (d *OpencontrolData) GetAllCertifications() (map[string]Certification, error) {
	res := map[string]Certification{}
	fileinfos, err := ioutil.ReadDir(d.certDir())
	if err != nil {
		return nil, err
	}
	for _, fileinfo := range fileinfos {
		cert, err := certifications.Load(d.certDir() + fileinfo.Name())
		if err != nil {
			return nil, err
		}
		controls := map[string]StandardSubset{}
		for _, name := range cert.GetSortedStandards() {
			controls[name] = cert.GetControlKeysFor(name)
		}

		res[cert.GetKey()] = Certification{
			Key:      cert.GetKey(),
			Controls: controls,
		}
	}
	return res, nil
}

func (d *OpencontrolData) certDir() string {
	return d.cacheDir + "/certifications/"
}
