import {
	BadgeCheck,
	ChartNoAxesCombined,
	LayoutDashboard,
	ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
	{
		id: "dashboard",
		label: "Dashboard",
		path: "/admin/dashboard",
		icon: <LayoutDashboard />,
	},
	{
		id: "products",
		label: "Products",
		path: "/admin/products",
		icon: <ShoppingBasket />,
	},
	{
		id: "orders",
		label: "Orders",
		path: "/admin/orders",
		icon: <BadgeCheck />,
	},
];

function MenuItems({ setOpen }) {
	const navigate = useNavigate();

	return (
		   <nav className="mt-8 flex-col flex gap-2">
			   {adminSidebarMenuItems.map((menuItem) => (
				   <div
					   key={menuItem.id}
					   onClick={() => {
						   navigate(menuItem.path);
						   setOpen ? setOpen(false) : null;
					   }}
					   className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors duration-200 hover:bg-red-100 hover:text-red-700 hover:shadow-md"
					   style={{ transition: 'background 0.2s, color 0.2s, box-shadow 0.2s' }}
				   >
					   {menuItem.icon}
					   <span>{menuItem.label}</span>
				   </div>
			   ))}
		   </nav>
	);
}

function AdminSideBar({ open, setOpen }) {
	const navigate = useNavigate();

	return (
		<Fragment>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side="left" className="w-64" open={open}>
					<button
						className="lg:hidden absolute top-4 right-4 text-2xl text-gray-600 hover:text-black focus:outline-none"
						onClick={() => setOpen(false)}
						aria-label="Close sidebar"
						type="button"
					>
						&#10005;
					</button>
					<div className="flex flex-col h-full">
						<SheetHeader className="border-b">
							<SheetTitle className="flex gap-2 mt-5 mb-5">
								<ChartNoAxesCombined size={30} />
								<span className="text-2xl font-extrabold">Admin Panel</span>
							</SheetTitle>
						</SheetHeader>
						<MenuItems setOpen={setOpen} />
					</div>
				</SheetContent>
			</Sheet>
			<aside className="hidden w-64 flex-col shadow-lg bg-background p-6 lg:flex">
				<div
					onClick={() => navigate("/admin/dashboard")}
					className="flex cursor-pointer items-center gap-2"
				>
					<ChartNoAxesCombined size={30} />
					<h1 className="text-2xl font-extrabold">Admin Panel</h1>
				</div>
				<MenuItems />
			</aside>
		</Fragment>
	);
}

export default AdminSideBar;
