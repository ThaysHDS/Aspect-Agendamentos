import { useEffect, useState } from "react";

interface LocationData {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  [key: string]: any;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  // const fetchLocation = async () => {
  //   const controller = new AbortController();
  //   const timeout = setTimeout(() => controller.abort(), 3000); // 3 segundos
  //
  //   try {
  //     const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
  //
  //     if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
  //     const data: LocationData = await res.json();
  //     setLocation(data);
  //   } catch (err: any) {
  //     console.warn("⚠️ Não foi possível obter a localização via IPAPI:", err);
  //     setError("Localização não disponível");
  //     setLocation({
  //       city: "Desconhecida",
  //       country: "Desconhecido",
  //     });
  //   } finally {
  //     clearTimeout(timeout); // sempre limpa o timeout
  //   }
  // };
  //
  // fetchLocation();

}, []);

  return { location, error };
}
