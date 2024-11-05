#!/bin/bash

# Script to run generate.ts with NODE_OPTIONS set for ts-node ESM loader
NODE_OPTIONS='--loader ts-node/esm' npx ts-node src/generate.ts