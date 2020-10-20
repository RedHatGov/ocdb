## Common Criteria
Red Hat Advanced Cluster Management for Kubernetes has not undergone Common Criteria certification. A future certification
against the [NIAP Protection Profile for Application Software](https://www.niap-ccevs.org/Profile/Info.cfm?PPID=394&id=394)
is being considered.

To help Red Hat track demand for a Common Criteria certification of Red Hat Advanced Cluster Management for Kubernetes v2.x,
please [open a customer support case](https://access.redhat.com/support/cases/#/case/new) requesting
a certification.

## FIPS 140-2
Federal Information Processing Standard 140-2 is a legal requirement ensuring cryptographic tools
implement algorithms properly. Vendors must certify their cryptographic implementations through NIST's
[Cryptographic Module Validation Program](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program).

FIPS 140-2 validation does not constitute an entire product. Rather, underlying cryptographic subsystems
or components, such as OpenSSL and OpenSSH, are validated.

Currently, Red Hat Advanced Cluster Management for Kubernetes does not have any FIPS validations and does not
use FIPS validated cryptography. Those features are road-mapped for future releases.

### USGv6 / IPv6
Red Hat Advanced Cluster Management for Kubernetes does not have any US Government IPv6 certifications.

### Section 508 / VPAT
[Red Hat Accessibility Conformance Report](https://access.redhat.com/sites/default/files/attachments/section508-vpat-rhacm-2.0.pdf)
is available as of 5th August 2020. Full listings of VPAT guides can be seen at
[Red Hat Knowledge Base](https://access.redhat.com/articles/2918071).

### Configuration Guides
A NIST National Checklist for Red Hat Advanced Cluster Management for Kubernetes is currently being developed.

## NIST 800-53
NIST 800-53 control responses are available to the general public in [interactive form](/ato/products/rhacm/NIST-800-53).
For immediate evaluation of certification responses progress, review [NIST-800-53 visuals](/ato/products/rhacs/Charts?tab=0).

## SCAP
SCAP content for automated assessment of Red Hat Advanced Cluster Management is not available at the moment.
