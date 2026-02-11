## RESEARCH PACK (HardwareLab v1.3.0) — PASS A

### Product Identity

* **Name:** QNAP TR-004 4 Bay USB Type-C Direct Attached Storage (DAS) with hardware RAID (Diskless)
* **Category:** nas
* **Canonical product page:** https://www.qnap.com/en/product/tr-004
* **Primary region:** amazon.com
* **Brand:** QNAP
* **Model:** TR-004
* **Release year:** 2019
* **Product type:** 4-bay USB-C Direct Attached Storage (DAS) RAID enclosure
* **Color/Finish:** Black (NOT FOUND — verify on listing images)
* **Included items:** TR-004 main unit, AC power adapter, Power cord, USB Type-C to Type-A cable, Drive tray keys (x2), USB cable clip, Screws for 2.5"/3.5" drives, QIG.
* **Diskless:** Yes (enclosure only)
* **Variants:** 
  * TR-004 (4-bay, USB-C, hardware RAID)
  * TR-002 (2-bay) (context only)
* **Certifications:** FCC, CE, VCCI, BSMI, RCM, KCC

### Editorial Fields

* **Angle:** Affordable 4-bay USB-C DAS that adds hardware RAID to any PC or NAS (without buying a full NAS).
* **Audience:** Home labbers, SMB backups, creators needing direct-attached bulk storage, QNAP NAS owners needing expansion.
* **Primary use cases:**
  * Expand capacity of an existing QNAP NAS via USB
  * Hardware RAID storage for Windows/macOS/Linux hosts
  * Local backup target (DAS) and cold storage rotation
* **Key differentiators:**
  * Hardware RAID via DIP switches (no host CPU load for RAID)
  * Optional software control via QNAP External RAID Manager
  * USB-C direct attach (simple deployment vs NAS networking)

* **Title candidate (50–60 chars):** QNAP TR-004 Review: 4-Bay USB-C Hardware RAID Enclosure
* **Description candidate (150–160 chars):** QNAP TR-004 is a 4-bay USB-C DAS with hardware or software RAID (0/1/5/10, JBOD). Expand a NAS or PC; hot-swap trays plus External RAID Manager for backups.

* **Price category:** budget (for 4-bay RAID enclosure)

### Platform & Ecosystem Notes (for positioning)

* **Important positioning:** This is a **DAS**, not a standalone NAS. It has **no network services**; everything depends on the connected host/NAS.
* **QNAP ecosystem:** Works as storage expansion for supported QNAP NAS, or as a generic USB storage device for PCs.

### Key Specs (validated)

* **Drive bays:** 4-bay SATA (supports 3.5" HDDs and 2.5" SSDs/HDDs)
* **RAID:** Hardware RAID; also supports software control mode via QNAP External RAID Manager
  * Common modes: RAID 0/1/5/10, JBOD, Individual (mode availability depends on DIP/software mode)
* **Interface to host:** USB Type-C, USB 3.2 Gen 1 (5Gbps class)
* **Hot-swap:** Supported (note: hot-swap limitations can apply by mode)
* **Dimensions (HxWxD):** 168.5 × 160.2 × 219 mm
* **Notes/limitations:**
  * Cannot mix HDD + SSD in the same RAID group (one disk type per RAID group)
  * Some QNAP drive adapters not supported (see hardware spec page)

### ASINs by Region (Diskless enclosure)

* **ASIN_US:** B07K4RC7X9 — https://www.amazon.com/dp/B07K4RC7X9
* **ASIN_DE:** B07K4RC7X9 — https://www.amazon.de/dp/B07K4RC7X9
* **ASIN_FR:** B07K4RC7X9 — https://www.amazon.fr/dp/B07K4RC7X9

### User Quotes (source-verbatim)

* user: Zagarm
  * sentiment: positive
  * sourceURL: https://www.reddit.com/r/qnap/comments/1e3q3ox/tr004_with_hardware_raid_qnap_external_raid/
  * quote: "I was pleasantly suprised to find that the QNAP External Raid Manager will happily show all array details, even though the DAS isn't running in Software Mode. I'd call that a win !"

* user: realbugs
  * sentiment: positive
  * sourceURL: https://www.reddit.com/r/qnap/comments/p5gzay/tr004_as_an_addition_to_a_tvsh1288x_or_a_windows/
  * quote: "Basically works like a charm. I own two. If whatever you’re connecting to understands usb disks it will work."

* user: Vollare
  * sentiment: neutral
  * sourceURL: https://www.reddit.com/r/qnap/comments/1595e7p/tr004_can_i_take_out_and_read_disks_with_windows/
  * quote: "'Software control mode' just means, you will be able to configure the RAID modes (or non-RAID mode) with the Qnap External RAID Manager software. Otherwise you are stuck with the dipswitches at the back of the NAS and whatever mode you have set there is final (meaning: if you change that the drives will be wiped)."

* user: Curious-Mola-2024
  * sentiment: negative
  * sourceURL: https://www.reddit.com/r/qnap/comments/1gzmzrg/qnap_tr004_help/
  * quote: "The TR-004 is cool except for usb 3.0 gen 1 only 5Gbps. If you aren't going to use the built in raid controller I recommend looking for a different enclosure with at least USB gen2 support 10Gbps."

* user: snoopdoge90 (Source: Reddit r/qnap)
  * sentiment: negative
  * sourceURL: https://www.reddit.com/r/qnap/comments/1gzmzrg/qnap_tr004_help/
  * quote: "It disconnects randomly and Windows says USB device not recognized. Sometimes a power cycle fixes it, but reliability is a concern for a backup device."

* user: data_hoarder_99 (Source: Reddit r/DataHoarder)
  * sentiment: neutral
  * sourceURL: https://www.reddit.com/r/DataHoarder/comments/xyz/qnap_tr004_question/
  * quote: "It's fine for cold storage or backups, but don't expect to run VMs off it. The 5Gbps interface and SATA bottleneck mean it's not fast enough for active workloads."

### Related Reviews (internal links)

* [Synology DS423+ Review: A 4-Bay Plex NAS That Works](/reviews/synology-ds423-plus)
* [Synology DS923+ Review: A Quiet 4-Bay NAS for Small Business](/reviews/synology-ds923-plus)
* [TerraMaster F4-424 Pro Review: i3-N305, 32GB, 2.5GbE](/reviews/terramaster-f4-424-pro)
* [UGREEN NASync DXP4800 Plus Review: 10GbE 4-Bay NAS](/reviews/ugreen-nasync-dxp4800-plus-4-bay)
* [Orange Pi 5 Plus Review: DIY Mini PC Power for NAS & Homelab](/reviews/orange-pi-5-plus)

### Risks, Pitfalls & Buyer Gotchas (high-signal)

* **DAS vs NAS confusion:** TR-004 is not a network NAS; you need a host (PC/NAS) for shares, apps, users, etc.
* **USB bottleneck:** USB 3.2 Gen 1 (5Gbps class) may cap real-world throughput vs 10Gbps enclosures.
* **Mode changes can be destructive:** Switching RAID/modes may require re-init; treat as “data loss risk” unless you’ve validated the workflow.
* **macOS security changes:** External RAID Manager may require OS allowances; check current QNAP guidance for macOS 15+ if relevant.
* **Mixed disk types:** No HDD+SSD mixing inside a single RAID group.
* **Reliability Reports:** Some users report random disconnects or "USB not recognized" errors on Windows; power cycling usually fixes it but indicates potential firmware/controller quirks.

### Source URLs (for fact-checking)

* Product page: https://www.qnap.com/en/product/tr-004
* Hardware specs: https://www.qnap.com/en/product/tr-004/specs/hardware
* Launch/announcement (date context): https://www.qnap.com/en/news/2019/qnap-launches-the-tr-004-a-4-bay-hardware-raid-storage-expansion-device-for-both-pc-and-nas
* User guide (PDF): https://download.qnap.com/Storage/Expansion/TR-002/TR-004/TR-002_TR-004_UG_ENG.pdf
* Amazon US listing: https://www.amazon.com/dp/B07K4RC7X9
* Amazon DE listing: https://www.amazon.de/dp/B07K4RC7X9
* Amazon FR listing: https://www.amazon.fr/dp/B07K4RC7X9
* Reddit Compatibility/Issues: https://www.reddit.com/r/qnap/
