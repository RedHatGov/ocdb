## Common Criteria
Ansible Tower has not undergone Common Criteria certification. A future certification
against the [NIAP Protection Profile for Application Software](https://www.niap-ccevs.org/Profile/Info.cfm?PPID=394&id=394) is being considered.

To help Red Hat track demand for a Common Criteria certification of Ansible Tower, please <a href="https://access.redhat.com/support/cases/#/case/new">open a customer support case</a> requesting a certification.

## FIPS 140-2
Federal Information Processing Standard 140-2 is a legal requirement ensuring cryptographic tools implement algorithms properly. Vendors must certify their cryptographic implementations through NIST's [Cryptographic Module Validation Program](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program).

FIPS 140-2 validation does not constitute an entire product. Rather, underlying cryptographic
subsystems or components, such as OpenSSL and OpenSSH, are validated. 

When Ansible Tower runs on Red Hat Enterprise Linux 7.x, the following FIPS 140-2 validations
are retained:

| Product | Component | Version | NIST Certificate | Status | Sunset/Expiration? |
|:--------|:----------|:-------:|:----------------:|:------:|:------------------:|
| Red Hat Enterprise Linux 7.x | OpenSSL | 5.0 | [#3016](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program/Certificate/3016) | <span class="usa-label-big">ACTIVE</span> | 9/14/2022 |
| Red Hat Enterprise Linux 7.x | OpenSSH Client | 5.0 | [#3067](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program/Certificate/3067) | <span class="usa-label-big">ACTIVE</span> | 11/26/2022 |
| Red Hat Enterprise Linux 7.x | OpenSSH Server | 5.0 | [#3063](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program/Certificate/3063) | <span class="usa-label-big">ACTIVE</span> | 11/13/2022 |
| Red Hat Enterprise Linux 7.x | Libreswan | 5.0 | [#3083](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program/Certificate/3083) | <span class="usa-label-big">ACTIVE</span> | 12/18/2022 |
| Red Hat Enterprise Linux 7.x | GnuTLS | 5.0 | [#3012](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program/Certificate/3012) | <span class="usa-label-big">ACTIVE</span> | 9/7/2022 |
| Red Hat Enterprise Linux 7.x | libgcrypt | 5.0 | [#2657](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program/Certificate/2657) | <span class="usa-label-big">ACTIVE</span> | 6/12/2021 |
| Red Hat Enterprise Linux 7.x | NSS | 5.0 | [#3070](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program/Certificate/3070) | <span class="usa-label-big">ACTIVE</span> | 2/7/2023 |

#### Known Issues with FIPS 140-2 Enablement
Currently Ansible Tower is not supported on a FIPS-enabled operating system. Contact
your Red Hat representative for roadmap information.

### USGv6 / IPv6
Ansible Tower does not have any US Government IPv6 certifications.

### Section 508 / VPAT
Direct link to Ansible Tower 3.x Section 508 VPAT and WCAG documentation:
[https://www.ansible.com/hubfs/government/Ansible_Tower_Section_508_VPAT.pdf?hsLang=en-us](https://www.ansible.com/hubfs/government/Ansible_Tower_Section_508_VPAT.pdf?hsLang=en-us).

### Configuration Guides
A NIST National Checklist for Ansible Tower is currently being developed. Contact your Red Hat
representative for pre-release access!
