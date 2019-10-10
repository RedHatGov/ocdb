## Common Criteria
CoreOS v4.x has not undergone Common Criteria certification. A future certification
against the [NIAP Protection Profile for Application Software](https://www.niap-ccevs.org/Profile/Info.cfm?PPID=394&id=394) is being considered.

To help Red Hat track demand for a Common Criteria certification of CoreOS v4.x, please <a href="https://access.redhat.com/support/cases/#/case/new">open a customer support case</a> requesting a certification.

## FIPS 140-2
Federal Information Processing Standard 140-2 is a legal requirement ensuring cryptographic tools implement algorithms properly. Vendors must certify their cryptographic implementations through NIST's [Cryptographic Module Validation Program](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program).

FIPS 140-2 validation does not constitute an entire product. Rather, underlying cryptographic
subsystems or components, such as OpenSSL and OpenSSH, are validated. 

Currently, CoreOS 4.x does not have any FIPS validations and does not use FIPS validated cryptography. Those features are roadmapped
for a future CoreOS 4.x release.

### USGv6 / IPv6
CoreOS v4.x does not have any US Government IPv6 certifications.

### Section 508 / VPAT
CoreOS 4.x does not currently have a VPAT document. This is planned for a future release.

### Configuration Guides
A NIST National Checklist for CoreOS v4.x is currently being developed. 
