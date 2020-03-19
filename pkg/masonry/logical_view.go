package masonry

import (
	"fmt"
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
)

// CustomControl is object that ties together information from standard with product specific "satisfaction" description
type CustomControl struct {
	Key       string
	Control   common.Control
	Satisfies common.Satisfies
}

func standardToLogicalView(s common.Standard) map[string][]CustomControl {
	result := make(map[string][]CustomControl)
	controls := s.GetControls()
	for _, controlName := range s.GetSortedControls() {
		control := controls[controlName]
		_, ok := result[control.GetFamily()]
		if !ok {
			result[control.GetFamily()] = make([]CustomControl, 0)
		}
		result[control.GetFamily()] = append(result[control.GetFamily()], CustomControl{
			Key:     controlName,
			Control: control})
	}
	return result
}

var validImplementationStatuses = []string{"complete", "partial", "not applicable", "planned", "unsatisfied", "unknown", "none"}

type ControlsByFamilies map[string]map[string][]CustomControl

func (ms *OpencontrolData) ComponentLogicalView(c common.Component) (ControlsByFamilies, []string) {
	result := make(ControlsByFamilies)
	problems := make([]string, 0)

	for _, satisfy := range c.GetAllSatisfies() {
		standardKey := satisfy.GetStandardKey()
		_, ok := result[standardKey]
		if !ok {
			standard, found := ms.GetStandard(standardKey)
			if found {
				result[standardKey] = standardToLogicalView(standard)
			}

		}
		found := false
		for groupId, group := range result[standardKey] {
			for i, cc := range group {
				if cc.Key == satisfy.GetControlKey() {
					if cc.Satisfies != nil {
						problems = append(problems, fmt.Sprintf("Found duplicate item: %s", cc.Key))
					}

					result[standardKey][groupId][i].Satisfies = satisfy
					found = true

					switch satisfy.GetImplementationStatus() {
					case "complete", "partial", "not applicable", "planned", "unsatisfied", "unknown", "none":
						break
					default:
						problems = append(problems,
							fmt.Sprintf("Found non-standard implementation_status: %s. Expected one of %s.",
								satisfy.GetImplementationStatus(), validImplementationStatuses))
						break
					}

					break
				}

			}
			if found {
				break
			}
		}
		if !found {
			problems = append(problems, fmt.Sprintf("Could not find reference %s in the standard %s", satisfy.GetControlKey(), standardKey))

		}
	}

	return result, problems
}
