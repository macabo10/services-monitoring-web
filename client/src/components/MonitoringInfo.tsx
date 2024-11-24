'use client'

type ContainerID = { id: string };
type ContainerStatus = { status: boolean };
type APIStatus = { exchange_status: boolean, gold_status: boolean };
type UserCapacity = { in: number; out: number };
type CPU = { usage: number };
type RAM = { usage: number, used: number; max: number, unit: string };
type Network = { in: number, out: number, unit: string };

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