import "../styles/Search.css";
import searchImg from "../assets/searchImg.png";
import { useState } from "react";
import { getObjectIds, getDocuments, getHistograms } from "../api/api";

const Search = () => {
  const [inn, setInn] = useState("");
  const [limit, setLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [histData, setHistData] = useState([]);

  const isValid = inn.length >= 10 && limit > 0;

  const handleSearch = async () => {
    if (!isValid) return;

    setLoading(true);
    setDocs([]);
    setHistData([]);

    try {
      const body = {
        issueDateInterval: {
          startDate: "2020-01-01T00:00:00+03:00",
          endDate: "2024-12-31T23:59:59+03:00",
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [{ type: "company", inn }],
          },
        },
        limit: Number(limit),
      };

      const hist = await getHistograms(body);
      const total = hist.find((h) => h.histogramType === "totalDocuments");
      setHistData(total?.data || []);

      const ids = await getObjectIds(body);
      const documents = await getDocuments(ids.slice(0, 10));
      setDocs(documents);
    } catch (e) {
      alert("Ошибка запроса");
    }

    setLoading(false);
  };

  return (
    <section className="search container">
      <div className="search-left">
        <h1>Найдите необходимые данные</h1>

        <div className="search-card">
          <div className="search-grid">
            {/* LEFT */}
            <div className="inputs">
              <label>ИНН компании *</label>
              <input
                value={inn}
                onChange={(e) => setInn(e.target.value)}
                placeholder="10 цифр"
              />

              <label>Тональность</label>
              <select>
                <option>Любая</option>
                <option>Позитивная</option>
                <option>Негативная</option>
              </select>

              <label>Количество документов *</label>
              <input
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="например 10"
              />

              <label>Диапазон дат *</label>
              <div className="dates">
                <input type="date" />
                <input type="date" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="checkboxes">
              <label>
                <input type="checkbox" /> Признак максимальной полноты
              </label>
              <label>
                <input type="checkbox" /> Упоминания в бизнес-контексте
              </label>
              <label>
                <input type="checkbox" /> Главная роль в публикации
              </label>
              <label>
                <input type="checkbox" /> Только с риск-факторами
              </label>
              <label>
                <input type="checkbox" /> Включать технические новости
              </label>
              <label>
                <input type="checkbox" /> Включать анонсы
              </label>
              <label>
                <input type="checkbox" /> Включать сводки новостей
              </label>
            </div>
          </div>

          <div className="search-bottom">
            <button disabled={!isValid} onClick={handleSearch}>
              {loading ? "Идет поиск..." : "Поиск"}
            </button>

            <span>* Обязательные поля</span>
          </div>
        </div>

        {/* ГИСТОГРАММА */}
        <div className="histogram">
          <h2>Общая сводка</h2>

          <div className="hist-table">
            <div className="hist-row header">
              <div>Дата</div>
              <div>Документы</div>
            </div>

            {histData.map((item, i) => (
              <div key={i} className="hist-row">
                <div>{new Date(item.date).toLocaleDateString()}</div>
                <div>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ДОКУМЕНТЫ */}
        <div className="results">
          {docs.map((doc, i) => {
            const data = doc.ok;

            return (
              <div key={i} className="doc">
                <div className="doc-top">
                  <span>{new Date(data.issueDate).toLocaleDateString()}</span>
                  <span>{data.source.name}</span>
                </div>

                <h3>{data.title.text}</h3>

                <p
                  dangerouslySetInnerHTML={{
                    __html: data.content.markup,
                  }}
                />

                <a
                  href={data.url}
                  target="_blank"
                  rel="noreferrer"
                  className="doc-btn"
                >
                  Читать
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="search-right">
        <img src={searchImg} alt="" />
      </div>
    </section>
  );
};

export default Search;
