"use server"
import { db } from "../db/prisma"
import { AttendanceOptionalDefaultsSchema, AttendanceOptionalDefaults, Attendance, AttendancePartial, AttendancePartialSchema } from "@/zod-types/AttendanceSchema"

export async function createAttendance(attendance: AttendanceOptionalDefaults) {
  const _attendance = AttendanceOptionalDefaultsSchema.parse(attendance);
  const result = await db.attendance.create({
    data: _attendance
  })

  return result;
}

export async function selectAttendance(attendance: AttendancePartial) {
  const _attendance = AttendancePartialSchema.parse(attendance);
  const result = await db.attendance.findFirst({
    where: _attendance
  })

  return result;
}

export async function selectAttendances(attendance: AttendancePartial) {
  const _attendance = AttendancePartialSchema.parse(attendance);
  const result = await db.attendance.findMany({
    where: _attendance
  })

  return result;
}

export async function upsertAttendance(attendance: AttendancePartial) {
  const _attendance = AttendancePartialSchema.parse(attendance);
  const _attendanceCreate = AttendanceOptionalDefaultsSchema.parse(attendance);
  const result = await db.attendance.upsert({
    create: _attendanceCreate,
    update: _attendance,
    where: {
      Id: _attendance.Id
    }
  })

  return result;
}

export async function updateAttendance(attendance: Attendance) {
  const _attendance = AttendancePartialSchema.parse(attendance);
  const result = await db.attendance.update({
    data: _attendance,
    where: {
      Id: _attendance.Id
    }
  })

  return result;
}

export async function deleteAttendance(attendance: AttendanceOptionalDefaults) {
  const _attendance = AttendancePartialSchema.required({ Id: true }).parse(attendance)
  const result = db.attendance.delete({
    where: _attendance
  })

  return result
}