---
sidebar_position: 4
id: compute-resources
title: Compute Resources
---

## NUS Compute Resources

Access to robust computational resources is critical for accelerating discoveries in bioinformatics and cancer science research. Below is an overview of the available High-Performance Computing (HPC) and High-Throughput Computing (HTC) resources within NUS and externally at NSCC, designed to support your research needs.

[Website for booking](https://nusit.nus.edu.sg/hpc/)

### NUS Vanda – High-Throughput Computing (HTC) Cluster

NUS Vanda is an in-house HTC cluster designed for general computational workloads. It does not feature Infiniband but offers substantial CPU-based computing power for research requiring parallel processing.

[Website for booking](https://nusit.nus.edu.sg/hpc/)

**Hardware Specifications:**
- 336 Intel Xeon Platinum 8452Y CPUs
- Each CPU has 36 cores and 256GB DDR5 RAM

### NUS Hopper – AI-Optimized High-Performance Cluster

For AI-driven research, NUS Hopper provides cutting-edge hardware tailored to deep learning and computational biology workflows.

[Website for booking](https://nusit.nus.edu.sg/hpc/)

**Hardware Specifications:**
- 6 GPU nodes, each with:
    - 8x NVIDIA H100-80GB GPUs
    - 2x Intel 8480+ CPUs (56 cores per CPU)
    - 2TB RAM
    - 400Gb Infiniband NDR & 100GbE storage fabric
- High-Performance Scratch Storage (200TB)

## External Compute Resources

### NSCC ASPIRE2A – National Supercomputing Resource

NSCC's ASPIRE2A supercomputer delivers advanced capabilities for high-performance computing, providing a balanced environment for intensive computational research.

[Project calling](https://www.nscc.sg/project-calls/)

**Hardware Specifications:**
- AMD-Based Cray EX supercomputer
- 25PB of GPFS FS and 10PB of Lustre FS storage
- Slingshot high-speed interconnect
- GPU compute nodes: 4x NVIDIA A100-40G SXM per node

We encourage researchers to leverage these resources to drive impactful discoveries in cancer research and bioinformatics. If you need guidance on resource selection or optimization, feel free to consult our HPC team.

| Resource Type               | RIE-Funded Pricing (S$) | Non-RIE-Funded (Standard) Pricing* (S$) | Non-RIE-Funded (Premium) Pricing* (S$) |
|----------------------------|--------------------------|------------------------------------------|------------------------------------------|
| CPU Core Hours             | 0.006                    | 0.022                                    | 0.033                                    |
| GPU Card Hours - A100 (40GB) | 0.79                     | 2.43                                     | 3.11                                     |
| GPU Card Hours - H100      | 1.26                     | 4.40                                     | 4.80                                     |
| HDD Storage GB-month       | 0.021                    | 0.029                                    | 0.029                                    |


## Comparison

|**Attribute**|**NUS Vanda**|**NUS Hopper**|**NSCC ASPIRE2A**|
|---|---|---|---|
|**Type**|High-Throughput Computing (HTC)|High-Performance Computing (HPC), AI-optimized|National Supercomputing Resource (HPC)|
|**Target Workload**|General CPU-based workloads|GPU-accelerated AI/ML, deep learning, computational biology|Large-scale HPC workloads across disciplines|
|**CPU**|336× Intel Xeon Platinum 8452Y (36 cores each)|2× Intel Xeon 8480+ (56 cores) per node, 6 nodes|AMD-based Cray EX (core count not specified)|
|**RAM per Node**|256GB DDR5|2TB|Varies by node (not specified)|
|**GPU**|None|8× NVIDIA H100 80GB per node, 6 nodes|4× NVIDIA A100 40GB SXM per node|
|**Interconnect**|Standard Ethernet|400Gb Infiniband NDR + 100GbE|HPE Slingshot high-speed interconnect|
|**Storage**|Not specified|200TB HP scratch|25PB GPFS + 10PB Lustre|
|**Location**|NUS (on-campus)|NUS (on-campus)|Off-campus (NSCC)|
|**Best For**|Parallel CPU tasks, moderate use|Deep learning, AI, large-memory|Large-scale simulations, genomics|
|**Access**|Internal NUS|Internal NUS|NSCC account required|