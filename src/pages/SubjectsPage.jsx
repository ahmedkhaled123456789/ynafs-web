import { useEffect } from "react"; 
import { FaBook ,FaDownload} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../store/categoriesSlice";
import { baseURL } from "../Api/baseURL";
 const useQuery = () => new URLSearchParams(useLocation().search);

const SubjectsPage = () => {
  const query = useQuery();
  const semesterId = query.get("semesterId");

  const dispatch = useDispatch();
  const { subjects, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (semesterId) {
      dispatch(getSubjects(semesterId));
    }
  }, [dispatch, semesterId]);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center p-12">
      <h1 className="text-3xl font-bold mb-8">المواد الدراسية</h1>

      {loading && <p className="text-gray-500">جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {subjects.map((subject, index) => (
          <div
            key={subject._id || index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center "
          >
            <div className="mb-4"><FaBook size={70} /></div>
            <div className="text-lg font-semibold text-center mb-4">{subject.title}</div>
            {subject.books?(
              <a
href={`${(import.meta.env.DEV ? baseURL: "") + subject.books[0]?.path}`}
  download={subject.books[0]?.title+".pdf"}
  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition flex items-center gap-2"
>
  <FaDownload /> تحميل الكتاب
</a>
            ):(
              <p>الكتاب غير متاح الان    </p>
            )}
    


           
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsPage;
