## Common Criteria
OpenShift Container Platform 3.x has not undergone Common Criteria certification. A future certification
against the [NIAP Protection Profile for Application Software](https://www.niap-ccevs.org/Profile/Info.cfm?PPID=394&id=394) is being considered.

To help Red Hat track demand for a Common Criteria certification of OpenShift Container Platform 3.x, please open a
customer support case requesting an evaluation.

## FIPS 140-2
Federal Information Processing Standard 140-2 is a legal requirement ensuring cryptographic tools implement algorithms properly. Vendors must certify their cryptographic implementations through NIST's [Cryptographic Module Validation Program](https://csrc.nist.gov/Projects/Cryptographic-Module-Validation-Program).

FIPS 140-2 validation does not constitute an entire product. Rather, underlying cryptographic
subsystems or components, such as OpenSSL and OpenSSH, are validated. 

When OpenShift Container Platform 3.x runs on Red Hat Enterprise Linux 7.x, the following FIPS 140-2 validations
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
In OpenShift 3.10 and earlier, OpenShift utilized Golang-provided cryptographic libraries which have not undergone FIPS 140 validations. A potential mitigation was to use [Opportunistic IPSec](https://docs.openshift.com/container-platform/3.10/admin_guide/ipsec.html) which encapsulates all traffic in FIPS 140-2 validated OpenSSL tunnels (meeting the requirement for encryption in transit). Note this would encapsulate all traffic internal to the OpenShift environment, and would not protect external ingress/egress of traffic to the OpenShift environment itself.

OpenShift 3.11 and later was patched to use OpenSSL libraries provided by Red Hat Enterprise Linux.

## USGv6 / IPv6
OpenShift Container Platform 3.x does not have any US Government IPv6 certifications.

## Section 508 / VPAT
Coming soon.

## Configuration Guides
A NIST National Checklist for OpenShift Container Platform 3.x is currently being developed. Contact your Red Hat
representative for pre-release access!

## Risk Register
To assist with risk management decisions, a listing of known OpenShift limitations against NIST 800-53 rev4 controls is provided below. Limitations are categorized as high/medium/low severity in alignment with DISA's Vulnerability Severity Category Code Definitions:

| Severity Definition | DISA Category Code Guidelines |
|:---------------:|:------------------------------|
| HIGH (CAT I) | Any vulnerability, the exploitation of which will directly and immediately result in loss of Confidentiality, Availability, or Integrity.|
| MEDIUM (CAT II) | Any vulnerability, the exploitation of which has a potential to result in loss of Confidentiality, Availability, or Integrity.|
| LOW (CAT III) | Any vulnerability, the existence of which degrades measures to protect against loss of Confidentiality, Availability, or Integrity.|

The following are known limitations of OpenShift 3.x's ability to meet NIST 800-53 rev4 technical controls:

| NIST 800-53 Control | Risk Determination | Description/Rationale |
|:-------------------:|:------------------:|:---------------------------|
| AC-7(b) | LOW | AC-7(b) requires that, upon exceeding consecutive failed logon attempt limits, the information system delays the next logon prompt by a selected amount of time. This capability is not present in OpenShift 3.x nor is it planned. The risk of Denial of Service attacks is mitigated through network settings, such as rate limiting through firewall configuration settings. If this capability is meaningful for your deployment, please open a feature request through your Red Hat account team.|
