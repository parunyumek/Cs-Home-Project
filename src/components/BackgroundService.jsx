import { useSelector } from "react-redux";

const BackgroundService = () => {
  // const [services, setServices] = useState([]);

  // const fetchServices = async () => {
  //   try {
  //     const data = await fetchData();
  //     setServices(data);
  //   } catch (error) {
  //     console.error("Error fetching services:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchServices();
  // }, []);
  const data = useSelector((state) => state.data);

  return (
    <div className="absolute h-60 w-full ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${data.img}')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
    </div>
  );
};

export default BackgroundService;
