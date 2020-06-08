## Common Criteria
OpenShift Container Platform 4 has not undergone Common Criteria certification. A future certification
against the [NIAP Protection Profile for Application Software](https://www.niap-ccevs.org/Profile/Info.cfm?PPID=394&id=394)
is being considered.

To help Red Hat track demand for a Common Criteria certification of OpenShift Container Platform v4.x,
please [open a customer support case](https://access.redhat.com/support/cases/#/case/new) requesting
a certification.

## FIPS 140-2
Federal Information Processing Standard 140-2 is a legal requirement ensuring cryptographic tools
implement algorithms properly. Vendors must certify their cryptographic implementations through NIST's
[Cryptographic Module Validation Program](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program).

FIPS 140-2 validation does not constitute an entire product. Rather, underlying cryptographic subsystems
or components, such as OpenSSL and OpenSSH, are validated.

Currently, OpenShift Container Platform 4.x does not have any FIPS validations and does not use FIPS
validated cryptography. Those features are roadmapped for a future OpenShift Container Platform 4.x
release. [Product Documentation](https://docs.openshift.com/container-platform/4.4/installing/installing-fips.html)
can be consulted to review the latest developments on this front.

### USGv6 / IPv6
OpenShift Container Platform v4.x does not have any US Government IPv6 certifications.

### Section 508 / VPAT
OpenShift Container Platform 4.x does not currently have a VPAT document. This is planned for a future
release.

### Configuration Guides
A NIST National Checklist for OpenShift Container Platform v4.x is currently being developed.

## NIST 800-53
NIST 800-53 control responses are available to the general public in [interactive form](/ato/products/openshift-container-platform-4/NIST-800-53).
For immediate evaluation of certification responses progress review [NIST-800-53 visuals](/ato/products/openshift-container-platform-4/Charts?tab=0)

## SCAP 
SCAP content for automated assessment of OpenShift Container platform is developed in open source under
[ComplianceAsCode](https://github.com/ComplianceAsCode/content) upstream project. To download the latest
greatest bits follow up to the [SCAP Download Page](/ato/products/openshift-container-platform-4/SCAP).

## Red Hat CoreOS
[Red Hat CoreOS ATO](http://atopathways.redhatgov.io/ato/products/coreos-4/Overview) is tracked on separate
page.
