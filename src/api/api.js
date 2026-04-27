const BASE_URL = "https://gateway.scan-interfax.ru/api/v1";

/* 🔐 LOGIN */
export const loginRequest = async (login, password) => {
  const res = await fetch(`${BASE_URL}/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Ошибка авторизации");
  }

  return data;
};

/* 📊 IDS */
export const getObjectIds = async (body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/objectsearch`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.items?.map((i) => i.encodedId) || [];
};

/* 📄 DOCS */
export const getDocuments = async (ids) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });

  const data = await res.json();
  return data;
};

/* 📈 HIST */
export const getHistograms = async (body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/objectsearch/histograms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.data || [];
};
