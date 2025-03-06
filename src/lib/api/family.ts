"use server"
import { db } from "../db/prisma"
import { FamilyOptionalDefaultsSchema, FamilyOptionalDefaults, Family, FamilyPartial, FamilyPartialSchema } from "@/zod-types/FamilySchema"

export async function createFamily(family: FamilyOptionalDefaults) {
  const _family = FamilyOptionalDefaultsSchema.parse(family);
  const result = await db.family.create({
    data: _family
  })

  return result;
}

export async function selectFamily(family: FamilyPartial) {
  const _family = FamilyPartialSchema.parse(family);
  const result = await db.family.findFirst({
    where: _family
  })

  return result;
}

export async function selectFamilys(family: FamilyPartial) {
  const _family = FamilyPartialSchema.parse(family);
  const result = await db.family.findMany({
    where: _family
  })

  return result;
}

export async function upsertFamily(family: FamilyPartial) {
  const _family = FamilyPartialSchema.parse(family);
  const _familyCreate = FamilyOptionalDefaultsSchema.parse(family);
  const result = await db.family.upsert({
    create: _familyCreate,
    update: _family,
    where: {
      Id: _family.Id
    }
  })

  return result;
}

export async function updateFamily(family: Family) {
  const _family = FamilyPartialSchema.parse(family);
  const result = await db.family.update({
    data: _family,
    where: {
      Id: _family.Id
    }
  })

  return result;
}

export async function deleteFamily(family: FamilyOptionalDefaults) {
  const _family = FamilyPartialSchema.required({ Id: true }).parse(family)
  const result = db.family.delete({
    where: _family
  })

  return result
}