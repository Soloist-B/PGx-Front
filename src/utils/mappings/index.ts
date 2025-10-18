import type { MappingTable } from "../genotypeTypes";
import { CYP2C9 } from "./cyp2c9";
import { VKORC1 } from "./vkorc1";
import { CYP2C19 } from "./cyp2c19";
import { CYP2D6 } from "./cyp2d6";
import { CYP3A5 } from "./cyp3a5";
import { TPMT } from "./tpmt";
import { HLAB } from "./hla-b";

export const genotypeMappings: MappingTable = {
  CYP2C9,
  VKORC1,
  CYP2C19,
  CYP2D6,
  CYP3A5,
  TPMT,
  "HLA-B*15:02": HLAB,
};

export type { GeneMapping, Marker, MappingTable, GenotypeRow } from "../genotypeTypes";
