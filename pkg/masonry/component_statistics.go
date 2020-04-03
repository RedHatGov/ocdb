package masonry

import (
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
)

type ResultStats map[string]int

type CertificationFamilyStatistics map[string]ResultStats

type ComponentFamilyStatistics struct {
	Key            string
	Certifications map[string]CertificationFamilyStatistics
}

func (ms *OpencontrolData) ComponentFamilyStatistics(c common.Component) ComponentFamilyStatistics {
	res := ComponentFamilyStatistics{}
	res.Key = c.GetKey()
	res.Certifications = map[string]CertificationFamilyStatistics{}

	satisfiesMap := map[string]string{}
	for _, sat := range c.GetAllSatisfies() {
		satisfiesMap[sat.GetControlKey()] = sat.GetImplementationStatus()
	}

	for _, cert := range ms.GetAllCertifications() {
		cMap := CertificationFamilyStatistics{}
		for standardName, subSet := range cert.Controls {
			if standardName == "NIST-800-53" {
				for ctrlID, _ := range subSet {
					status, found := satisfiesMap[ctrlID]
					if !found {
						status = "unknown"
					}
					family := ctrlID[0:2]

					_, found = cMap[family]
					if !found {
						cMap[family] = ResultStats{}
					}

					prev, found := cMap[family][status]
					if !found {
						prev = 0
					}
					cMap[family][status] = prev + 1
				}
			}
		}
		res.Certifications[cert.Key] = cMap
	}
	return res
}
