require("dotenv").config();

// Importar os ABIs normalmente (mantenha os arquivos na pasta correta)
const CFD_TOKEN_ABI = require("../abis/CFDToken.json").abi;
const AFFILIATE_MANAGER_ABI = require("../abis/AffiliateManager.json").abi;
const ICO_PHASE1_ABI = require("../abis/ICOPhase1.json").abi;
const USDT_ABI = require("../abis/USDT.json").abi;

// Lê os endereços a partir do .env (Render já fornece isso via painel)
const CONTRACTS = {
  CFD_TOKEN: process.env.CFD_TOKEN_ADDRESS,
  USDT: process.env.USDT_ADDRESS,
  ICO_PHASE1: process.env.ICO_CONTRACT_ADDRESS,
};

// Verificação opcional para ajudar no debug e evitar deploy com variável faltando
for (const [key, value] of Object.entries(CONTRACTS)) {
  if (!value) {
    throw new Error(`Variável de ambiente para o contrato ${key} não definida.`);
  }
}

module.exports = {
  CONTRACTS,
  CFD_TOKEN_ABI,
  AFFILIATE_MANAGER_ABI,
  ICO_PHASE1_ABI,
  USDT_ABI,
};
