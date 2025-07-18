import React from "react";
import Logo from "../../../../public/Altrechem.png";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../../../utils/AuthStore.tsx";
import { LogOut } from "lucide-react";

interface SidebarProps {
	isOpen: boolean,
	onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/admin");
	};

	const goToOverview = () => navigate("/dashboard");
	const goToProducts = () => navigate("/dashboard/products");
	const goToOrders = () => navigate("/dashboard/orders");
	const goToFinances = () => navigate("/dashboard/finances");

	return (
		<>
			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
					onClick={onClose}
				/>
			)}

			<div
				className={`fixed md:relative left-0 top-0 h-[970px] w-72 border-2 border-black/15 rounded-xl bg-white transform transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 z-50`}
			>
				<div className="flex justify-center mt-10">
					<img className="w-[120px] h-[120px] rounded-md shadow-md" src={Logo} alt="logo" />
				</div>
				<div className="text-center mt-4 text-lg font-bold">
					<div className="mt-8">
						<h2 className="text-xl text-black text-center font-bold">
							Welcome, {user?.name || "Admin"}!
						</h2>
					</div>
				</div>
				<div className="flex justify-center">
					<ul className="w-64 mt-5 text-lg text-gray-600 font-bold text-center mx-4">
						<li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={goToOverview}>
							Overview
						</li>
						<li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={goToOrders}>
							Orders
						</li>
						<li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={goToProducts}>
							Products
						</li>
						<li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={goToFinances}>
							Finances
						</li>
					</ul>
				</div>
				<div className="flex justify-center mt-24 md:mt-[375px]">
					<button
						onClick={handleLogout}
						className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
					>
						<LogOut size={35} />
					</button>
				</div>
			</div>
		</>
	);
};