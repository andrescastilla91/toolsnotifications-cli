const HOST = "localhost";
const HOST_API = "192.168.0.40";

const typeEnv: 'dev' | 'dev_int' | 'prod' = 'dev';

const url = {
  prod: {
    url_base_api: "https://api.marfilbsc.co/api/",
    url_base_storage: "",
  },
  dev: {
    url_base_api: "http://apidev.visionappweb.com/api/",
    url_base_storage: "",
  },
  dev_int: {
    url_base_api: `http://${HOST_API}:5351/api/`,
    url_base_storage: "",
  }
}


///* para desarrollo por fuera
export const environment = {
  production: false,
  NOMBRE_APLICACION: "ToolsNotifications",
  ENTORNO_LOGS: 'toolsnotifications-cli-dev',
  KEY_ECRYPT:'pvK218mEvdyH3SjIK5Vg',
  KEY_SESION_LOCAL_STORAGE: '_authTools',
  API_BASE: url[typeEnv].url_base_api,
  API_INTEGRACION_ENABLEMAIL: {
    KEY: 'live_49dd042d7bca7280eec6'
  }

};





