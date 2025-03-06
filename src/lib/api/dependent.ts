"use server"
import { db } from "../db/prisma"
import { DependentOptionalDefaultsSchema, DependentOptionalDefaults, Dependent, DependentPartial, DependentPartialSchema } from "@/zod-types/DependentSchema"

export async function createDependent(dependent: DependentOptionalDefaults) {
  const _dependent = DependentOptionalDefaultsSchema.parse(dependent);
  const result = await db.dependent.create({
    data: _dependent
  })

  return result;
}

export async function selectDependent(dependent: DependentPartial) {
  const _dependent = DependentPartialSchema.parse(dependent);
  const result = await db.dependent.findFirst({
    where: _dependent
  })

  return result;
}

export async function selectDependents(dependent: DependentPartial) {
  const _dependent = DependentPartialSchema.parse(dependent);
  const result = await db.dependent.findMany({
    where: _dependent
  })

  return result;
}

export async function upsertDependent(dependent: DependentPartial) {
  const _dependent = DependentPartialSchema.parse(dependent);
  const _dependentCreate = DependentOptionalDefaultsSchema.parse(dependent);
  const result = await db.dependent.upsert({
    create: _dependentCreate,
    update: _dependent,
    where: {
      Id: _dependent.Id
    }
  })

  return result;
}

export async function updateDependent(dependent: Dependent) {
  const _dependent = DependentPartialSchema.parse(dependent);
  const result = await db.dependent.update({
    data: _dependent,
    where: {
      Id: _dependent.Id
    }
  })

  return result;
}

export async function deleteDependent(dependent: DependentOptionalDefaults) {
  const _dependent = DependentPartialSchema.required({ Id: true }).parse(dependent)
  const result = db.dependent.delete({
    where: _dependent
  })

  return result
}