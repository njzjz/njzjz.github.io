---
title: 用Intel®加速LAMMPS
url: 102.html
id: 102
categories:
  - Chemistry
date: 2018-09-23 00:40:56
tags:
---

2018-09-23

1.安装Intel® MPI Library并激活，如`source /share/apps/intel/compilers_and_libraries/linux/bin/compilervars.sh intel64`。  
<!--more-->
2.编译LAMMPS前，`make yes-user-intel`激活USER-INTEL package。  
3.用`make intel_cpu_intelmpi`编译LAMMPS。  
4.用`KMP_BLOCKTIME=0 mpirun -np 36 lmp_intel_cpu_intelmpi -pk intel 0 omp 2 -sf intel -in in.script`运行LAMMPS。  
5.在in.script的开头加入`processors * * * grid numa`。  
参考资料：https://lammps.sandia.gov/doc/Speed_intel.html
