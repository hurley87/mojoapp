import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const MOJOModule = buildModule('MOJOModule', (m) => {
  const mojo = m.contract('MOJO');

  return { mojo };
});

export default MOJOModule;
