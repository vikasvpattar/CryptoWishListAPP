import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import cryptos from "../assets/Cryptos.png";
import { setSelectedCurrency } from "../features/cryptoData/cryptoDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllDataQuery } from "../features/cryptoApi"; // Import the RTK Query hook
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

const navList = [
  { value: "Home", href: "home" },
  { value: "Coins", href: "coins" },
  { value: "Wishlist", href: "wishlist" },
];

const fiatCurrency = [
  { label: "USD", id: "usd" },
  { label: "INR", id: "inr" },
];

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const selectedCurrency = useSelector(
    (state) => state.CryptoData.selectedCurrency
  );
  const dispatch = useDispatch();
  const drawRef = useRef();

  // Fetch the crypto data using RTK Query and pass the selected currency as an argument
  const { data, error, isLoading } = useGetAllDataQuery(selectedCurrency);

  const storedCurrency = useMemo(
    () => JSON.parse(localStorage.getItem("currencyValue")) || "usd",
    []
  );

  useEffect(() => {
    if (selectedCurrency !== storedCurrency) {
      localStorage.setItem("currencyValue", JSON.stringify(selectedCurrency));
    }
  }, [selectedCurrency, storedCurrency]);

  const handleSelect = useCallback(
    (e) => {
      const selectedValue = e.target.value;
      localStorage.setItem("currencyValue", JSON.stringify(selectedValue));
      dispatch(setSelectedCurrency(selectedValue));
    },
    [dispatch]
  );

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (drawRef.current && !drawRef.current.contains(e.target)) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <header className="bg-blue-700 w-full sticky z-30 top-0 px-5">
      <nav className="flex justify-between items-center mx-auto w-full max-w-6xl py-4 text-white font-bold">
        <NavLink to="/">
          <div className="w-32">
            <img src={cryptos} alt="Cryptos" />
          </div>
        </NavLink>
        <div className="hidden md:flex gap-4">
          {navList.map((item) => (
            <NavLink key={item.value} to={`/${item.href}`}>
              {item.value}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center">
          <select
            name="currency"
            id="currency"
            className="bg-transparent py-1 px-2 rounded-lg"
            defaultValue={storedCurrency}
            onChange={handleSelect}
          >
            {fiatCurrency.map((data) => (
              <option key={data.id} className="bg-blue-500" value={data.id}>
                {data.label}
              </option>
            ))}
          </select>
          <div ref={drawRef} className="block md:hidden">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-3 py-2.5"
              type="button"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <GiHamburgerMenu />
            </button>
            <AnimatePresence>
              {isNavOpen && (
                <div className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto bg-white sm:w-80 w-48 dark:bg-gray-800 transition-transform">
                  <h5 className="inline-flex items-center mb-4 text-base font-bold text-yellow-500 dark:text-gray-400">
                    Cryptos
                  </h5>
                  <button
                    type="button"
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <MdCancel />
                  </button>
                  <ul className="flex flex-col gap-4 text-blue-600">
                    {navList.map((item, i) => (
                      <motion.li
                        key={item.value}
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <NavLink
                          onClick={() => setIsNavOpen(false)}
                          to={`/${item.href}`}
                        >
                          {item.value}
                        </NavLink>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Navbar);
