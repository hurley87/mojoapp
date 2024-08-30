import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const ClaimModule = buildModule('ClaimModule', (m) => {
  const MOJO_CONTRACT_ADDRESS = '0x1E05FD32643f408EAfbB31805a32EeA257d7A027';
  const claim = m.contract('Claim', [MOJO_CONTRACT_ADDRESS]);

  return { claim };
});

export default ClaimModule;
