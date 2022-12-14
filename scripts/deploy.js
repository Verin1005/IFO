const hre = require("hardhat");

async function main() {
    var WETH9;
    var USDT;
    var UniswapV2Factory;
    var UniswapV2Router02;
    var SmartDisPatchInitializable;
    var DayOfRightsClub;
    var BlockhashMgr;
    var DayOfRightsClubPackage;
    var DayOfRightsReferral;
    var IFO;
    var PartnerReward;

    [deployer, ...users] = await ethers.getSigners();

    const WETH9Instance = await ethers.getContractFactory("WETH9");
    WETH9 = await WETH9Instance.deploy();
    await WETH9.deployed();

    const USDTInstance = await ethers.getContractFactory("USDT");
    USDT = await USDTInstance.deploy();
    await USDT.deployed();

    const UniswapV2FactoryInstance = await ethers.getContractFactory("UniswapV2Factory");
    UniswapV2Factory = await UniswapV2FactoryInstance.attach("0xc35dadb65012ec5796536bd9864ed8773abc74c4");

    const UniswapV2Router02Instance = await ethers.getContractFactory("UniswapV2Router02");
    UniswapV2Router02 = await UniswapV2Router02Instance.attach("0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506");

    const DORTokenInstance = await ethers.getContractFactory("DORToken");
    DORToken = await DORTokenInstance.deploy(
        "DOR Token",
        "DOR",
        18,
        deployer.address,
        deployer.address,
        USDT.address,
        UniswapV2Factory.address,
        UniswapV2Router02.address,
    );
    await DORToken.deployed();

    const SmartDisPatchInitializableInstance = await ethers.getContractFactory("SmartDisPatchInitializable");
    SmartDisPatchInitializable = await SmartDisPatchInitializableInstance.deploy();
    await SmartDisPatchInitializable.deployed();

    const DayOfRightsClubInstance = await ethers.getContractFactory("DayOfRightsClub");
    DayOfRightsClub = await DayOfRightsClubInstance.deploy();
    await DayOfRightsClub.deployed();

    const BlockhashMgrInstance = await ethers.getContractFactory("BlockhashMgr");
    BlockhashMgr = await BlockhashMgrInstance.deploy();
    await BlockhashMgr.deployed();

    const DayOfRightsClubPackageInstance = await ethers.getContractFactory("DayOfRightsClubPackage");
    DayOfRightsClubPackage = await DayOfRightsClubPackageInstance.deploy(BlockhashMgr.address, DayOfRightsClub.address);
    await DayOfRightsClubPackage.deployed();

    const DayOfRightsReferralInstance = await ethers.getContractFactory("DayOfRightsReferral");
    DayOfRightsReferral = await DayOfRightsReferralInstance.deploy(
        DayOfRightsClub.address,
        DayOfRightsClubPackage.address,
        deployer.address,
        USDT.address,
        DORToken.address,
    );
    await DayOfRightsReferral.deployed();

    const IFOInstance = await ethers.getContractFactory("IFO");
    IFO = await IFOInstance.deploy(
        deployer.address,
        USDT.address,
        DORToken.address,
        DayOfRightsClubPackage.address,
        DayOfRightsReferral.address,
    );
    await IFO.deployed();

    const PartnerRewardinstance = await ethers.getContractFactory("PartnerReward");
    PartnerReward = await PartnerRewardinstance.deploy(DayOfRightsReferral.address, DORToken.address);
    await PartnerReward.deployed();

    console.log("UniswapV2Factory  :::::", UniswapV2Factory.address);
    console.log("UniswapV2Router02 :::::", UniswapV2Router02.address);
    console.log("DORToken          :::::", DORToken.address);
    console.log("SmartDisPatchInitializable :::::", SmartDisPatchInitializable.address);
    console.log("DayOfRightsClub :::::", DayOfRightsClub.address);
    console.log("BlockhashMgr :::::", BlockhashMgr.address);
    console.log("DayOfRightsClubPackage :::::", DayOfRightsClubPackage.address);
    console.log("DayOfRightsReferral :::::", DayOfRightsReferral.address);
    console.log("IFO :::::", IFO.address);
    console.log("PartnerReward :::::", PartnerReward.address);

    // UniswapV2Factory  ::::: 0xc35dadb65012ec5796536bd9864ed8773abc74c4
    // UniswapV2Router02 ::::: 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506
    // DORToken          ::::: 0x9EF3269f4FAE93569c57aaA0C35772eD2b2e9147
    // SmartDisPatchInitializable ::::: 0x29B428a2e14CEe318144B6bd16F88a959eA010e4
    // DayOfRightsClub ::::: 0x251b0b9bFF603E4b41075C07b36D5FB4560B888A
    // BlockhashMgr ::::: 0x85830d8d9518F07831aaeB0171d4716Ce2EA2d36
    // DayOfRightsClubPackage ::::: 0xC3735e34eA1E7fEe2a90cc04F77fF2555421d741
    // DayOfRightsReferral ::::: 0x9C7d7B18D16269104F3B7180D1e6aeF6A29298Dd
    // IFO ::::: 0xAA04147Fc930ddDC1Dc6b0bA06E1fcaF6d0b7d64
    // PartnerReward ::::: 0x5419345C14d607Db8F671FAEB4e0C3f778BF5370

    console.log("--------------------deployed compelete------------------------");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
