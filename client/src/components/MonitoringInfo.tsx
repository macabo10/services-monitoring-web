'use client'

type ContainerID = { id: string };
type ContainerStatus = { status: boolean };
type APIStatus = { status: boolean };
type UserCapacity = { in: number; out: number };
type CPU = { usage: number };
type RAM = { usage: number, used: number; max: number };
type Network = { speed: number };

interface MonitoringInfo {
  containerID: ContainerID;
  container: ContainerStatus;
  api: APIStatus;
  userCapacity: UserCapacity;
  cpu: CPU;
  ram: RAM;
  network: Network;
}

export type { ContainerID, ContainerStatus, APIStatus, UserCapacity, CPU, RAM, Network };
export default MonitoringInfo;