---
sidebar_position: 4
id: compute-resources
title: Compute Resources
---

# Compute Resources

Explore the range of high-performance computing resources available for genomics, cancer research, and bioinformatics at NUS and beyond.

---

## 🏢 CSI Compute Resources
### GeDAC Cloudflow

:::info **TL;DR:**  
GeDAC Cloudflow lets CSI and NUS researchers run any Nextflow pipeline easily—no advanced bioinformatics or IT skills needed. **Focus on your research, not on setup.**
:::
[**Sign up →**](https://www.cloudflow.gedac.org/)

GeDAC Cloudflow is a fully managed, cloud-based platform for analyzing large-scale sequencing data. It helps researchers process and manage genomics datasets quickly and securely, with simple scaling and easy collaboration.

### GeDAC Server

:::info **TL;DR:**  
GeDAC Server is a dedicated, high-performance computer with powerful CPUs, lots of memory, and two advanced GPUs. **It’s easy to use and ideal for any researcher who needs fast computing for data analysis, deep learning, or large genomics projects.**
:::

[**Request Project Consultation →**](https://support.gedac.org/support/tickets/new)

**Overview:**  
GeDAC Server is a high-performance, single-node system designed for GPU-accelerated research at the Cancer Science Institute, NUS. It features:

- **CPU:** 64-core/128-thread
- **RAM:** 2TB
- **GPU:** 2× NVIDIA H100
- **Storage:** 240TB home, 49TB SSD scratch

Best suited for researchers needing a dedicated environment for GPU-intensive workflows, large datasets, or custom interactive analysis.

---

## 🏛️ NUS Compute Resources

Access robust computational resources to accelerate discoveries in bioinformatics and cancer science research.

### NUS Vanda – High-Throughput Computing (HTC) Cluster

:::info **TL;DR:**  
NUS Vanda is an in-house HTC cluster for general computational workloads. No Infiniband, but substantial CPU-based computing power for **parallel processing.**
:::

[**Book Vanda Cluster →**](https://nusit.nus.edu.sg/hpc/)

**Key Specs:**

- **CPU:** 336× Intel Xeon Platinum 8452Y (36 cores each)
- **RAM per node:** 256GB DDR5

Vanda supports parallel execution across 10–15 nodes, each running independent tasks. No high-speed interconnects (e.g., InfiniBand).

---

### NUS Hopper – AI-Optimized High-Performance Cluster

:::info **TL;DR:**  
NUS Hopper provides cutting-edge hardware for **AI-driven research, deep learning, and computational biology.**
:::

[**Book Hopper Cluster →**](https://nusit.nus.edu.sg/hpc/)

**Key Specs:**

- **GPU Nodes:** 6, each with:
  - 8× NVIDIA H100-80GB GPUs
  - 2× Intel 8480+ CPUs (56 cores each)
  - 2TB RAM
  - 400Gb Infiniband NDR & 100GbE storage fabric
- **Scratch Storage:** 200TB

Supports containerized workflows (Singularity, Docker) for scalable, reproducible research.

---

## 🌏 External Compute Resources

### NSCC ASPIRE2A – National Supercomputing Resource

:::info **TL;DR:**  
ASPIRE2A offers state-of-the-art HPC with massive parallelism, fast interconnects, and large-scale storage, ideal for **genomics, simulations, and data-intensive science.**
:::

ASPIRE2A is best suited for large-scale, CPU-intensive workloads such as whole-genome analysis, population-scale studies, and high-throughput simulations. It offers massive parallelism with over 100,000 CPU cores, fast interconnects, and a large shared file system—ideal for workflows requiring high memory and I/O performance across many nodes.

[**Apply for NSCC Project →**](https://www.nscc.sg/project-calls/)

**Key Specs:**

- **System:** AMD-Based Cray EX supercomputer
- **Storage:** 25PB GPFS, 10PB Lustre
- **Interconnect:** Slingshot high-speed
- **GPU Nodes:** 4× NVIDIA A100-40G SXM per node

**Pricing Table:**

| Resource Type                | RIE-Funded (S$) | Non-RIE (Standard) (S$) | Non-RIE (Premium) (S$) |
| ---------------------------- | --------------- | ----------------------- | ---------------------- |
| CPU Core Hours               | 0.006           | 0.022                   | 0.033                  |
| GPU Card Hours - A100 (40GB) | 0.79            | 2.43                    | 3.11                   |
| GPU Card Hours - H100        | 1.26            | 4.40                    | 4.80                   |
| HDD Storage GB-month         | 0.021           | 0.029                   | 0.029                  |

---

### NSCC ASPIRE2A+ AI – National Supercomputing Resource

:::info **TL;DR:**  
ASPIRE2A+ AI is optimized for GPU-accelerated tasks like **deep learning, image analysis, and AI model training.**
:::

ASPIRE 2A+ AI is optimized for GPU-accelerated tasks like deep learning, image analysis, and AI model training. With high-memory NVIDIA A100 GPUs and local NVMe storage, it’s ideal for researchers running TensorFlow, PyTorch, or GPU-enabled genomics tools that benefit from fast compute and data access within a node.

[**Apply for NSCC Project →**](https://www.nscc.sg/project-calls/)


**Key Specs:**

- **DGX SuperPOD:** 40 DGX H100 systems (320 NVIDIA H100 GPUs)
- **Networking:** 400 Gb/s NVIDIA InfiniBand
- **Memory:** 2TB per DGX H100
- **Storage:** 27.5PB home, 2.5PB scratch

**ASPIRE 2A vs ASPIRE 1:**

| Feature             | ASPIRE 2A vs ASPIRE 1           |
| ------------------- | ------------------------------- |
| Processing Cores    | >3.5× more                      |
| Physical Footprint  | 5× reduction (1.5× fewer nodes) |
| NVIDIA GPUs         | 2× more                         |
| Computational Power | 7× more                         |

---

### ☁️ AWS Cloud Platform

:::info **TL;DR:**  
AWS is ideal for workloads needing rapid scaling, flexible compute, or **short-term high-performance resources.** Best for fast turnaround when shared HPC queues are slow, but costs rise with large datasets.
:::

AWS Cloud Platform is well-suited for bioinformatics workloads that require rapid scaling, flexible compute configurations, or short-term access to high-performance resources. It is especially advantageous when fast turnaround is critical and queue times on shared HPC systems are a bottleneck. While AWS offers flexibility and speed, storage and data transfer costs increase with dataset size, making it most cost-effective for small to mid-sized workloads. Budget considerations are key, and effective cost management requires proper automation, monitoring, and workflow orchestration.

---

## 📊 Resource Comparison
| Attribute           | GeDAC Server                                                        | GeDAC Cloudflow              | NUS Vanda                    | NUS Hopper                            | NSCC ASPIRE2A                | NSCC ASPIRE2A+ AI                               | AWS Cloud Platform                            |
|---------------------|---------------------------------------------------------------------|------------------------------|------------------------------|----------------------------------------|------------------------------|-------------------------------------------------|------------------------------------------------|
| **Type**            | Dedicated GPU System                                                | Managed Cloud Platform       | HTC                          | HPC, AI-optimized                      | National HPC                 | National AI-optimized HPC                       | Cloud Platform                                |
| **Target Workload** | Deep learning, GPU pipelines, large-memory genomics/cancer          | Nextflow pipelines, genomics | General CPU                  | GPU-accelerated AI/ML, deep learning   | Large-scale HPC              | GPU-accelerated AI/ML, deep learning            | Flexible, scalable compute                    |
| **CPU**             | 1× 64-core/128-thread                                               | Cloud-based, managed         | 336× Xeon 8452Y (36 cores)   | 2× Xeon 8480+ (56 cores) per node, 6 nodes | AMD Cray EX                  | 2× Xeon per DGX H100, 40 systems                | Configurable                                  |
| **RAM/Node**        | 2TB                                                                 | Cloud-based, managed         | 256GB DDR5                   | 2TB per node                            | Varies                       | 2TB per DGX H100                                | Configurable                                  |
| **GPU**             | 2× NVIDIA H100                                                      | Cloud-based, managed         | None                         | 8× NVIDIA H100 80GB per node, 6 nodes  | 4× NVIDIA A100 40GB SXM/node  | 8× NVIDIA H100 per DGX H100, 40 systems         | Configurable                                  |
| **Interconnect**    | Standard Ethernet                                                   | Cloud-based, managed         | Standard Ethernet            | 400Gb Infiniband NDR + 100GbE           | HPE Slingshot                | 400Gb/s NVIDIA InfiniBand                      | 10/25/100GbE, EFA, etc.                        |
| **Storage**         | 240TB home, 49TB SSD scratch, 288TB HDD                             | Cloud-based, managed         | Not specified                | 200TB HP scratch                        | 25PB GPFS + 10PB Lustre       | 27.5PB home, 2.5PB scratch                      | EBS, S3, FSx, etc.                             |
| **Location**        | CSI, NUS                                                            | Cloud (CSI, NUS)             | NUS                          | NUS                                     | Off-campus (NSCC)             | Off-campus (NSCC)                               | Cloud (AWS region)                             |
| **Best For**        | Dedicated, high-performance GPU workflows, large datasets, interactive analysis | Easy, scalable Nextflow pipelines | Parallel CPU tasks, moderate use | Deep learning, AI, large-memory     | Large-scale simulations, genomics | Large-scale AI, deep learning, GPU-accelerated genomics | Rapid scaling, short-term compute, flexible workloads |
| **Access**          | Project consultation                                                | Self-signup                  | Internal NUS                 | Internal NUS                            | NSCC account                  | NSCC account                                    | AWS account                                    |

> **Need help choosing or optimizing resources?**  
> [Contact our GeDaC team for guidance →](/contact)
