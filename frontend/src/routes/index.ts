const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTRO_BASE: "/registro",
  ALUMNO_BASE: "/alumno",
  MENTOR_BASE: "/mentor",
  NOT_FOUND: "*",
};

export const RUTAS = {
  HOME: PATHS.HOME,
  LOGIN: PATHS.LOGIN,
  NOT_FOUND: PATHS.NOT_FOUND,

  REGISTRO: {
    BASE: PATHS.REGISTRO_BASE,
    MENTOR: `${PATHS.REGISTRO_BASE}/mentor`,
    ALUMNO: `${PATHS.REGISTRO_BASE}/alumno`,
    ADMIN: `${PATHS.REGISTRO_BASE}/admin`
  },

  ALUMNO: {
    BASE: PATHS.ALUMNO_BASE,
    EXPLORAR_MENTORES: `${PATHS.ALUMNO_BASE}/explorar-mentores`,
    DETALLE_MENTOR: `${PATHS.ALUMNO_BASE}/mentor/detalle`,//Base para concatenar luego con el ID
    DETALLE_MENTOR_ID: `${PATHS.ALUMNO_BASE}/mentor/detalle/:id`,
    SOLICITAR_MENTORIA: `${PATHS.ALUMNO_BASE}/mentor/solicitar-mentoria`,
    AGENDA: `${PATHS.ALUMNO_BASE}/agenda`,
    DETALLE_SESION_ASESORIA: `${PATHS.ALUMNO_BASE}/sesion-de-asesoria/detalle`,
    PERFIL: `${PATHS.ALUMNO_BASE}/perfil`,
  },

  MENTOR: {
    BASE: PATHS.MENTOR_BASE,
    PERFIL: `${PATHS.MENTOR_BASE}/perfil`,
    MENTORIAS: `${PATHS.MENTOR_BASE}/mentorias`,
    DETALLE_MENTORIA: `${PATHS.MENTOR_BASE}/mentoria/detalle`,//Base para concatenar luego con el ID
    DETALLE_MENTORIA_ID: `${PATHS.MENTOR_BASE}/mentoria/detalle/:id`,
    EDITAR_MENTORIA: `${PATHS.MENTOR_BASE}/mentoria/editar`,//Base para concatenar luego con el ID
    EDITAR_MENTORIA_ID: `${PATHS.MENTOR_BASE}/mentoria/editar/:id`,

    EDITAR_HORARIO_LABORAL:`${PATHS.MENTOR_BASE}/horario-laboral/editar`,
    NUEVA_MENTORIA: `${PATHS.MENTOR_BASE}/mentoria/nueva`,
    SOLICITUDES: `${PATHS.MENTOR_BASE}/solicitudes`,
    AGENDA: `${PATHS.MENTOR_BASE}/agenda`,
    DETALLE_SESION_ASESORIA: `${PATHS.MENTOR_BASE}/sesion-de-asesoria/detalle`,
  },
};