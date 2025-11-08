import { useState } from "react";
import { Box, Button, IconButton, Sheet, Container } from "@/Components/v3/ui";
import { Menu, X } from "lucide-react";
import ThemeSwitch from "../ThemeSwitch/index.jsx";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const AppAppBar = () => {
	const [open, setOpen] = useState(false);
	const mode = useSelector((state) => state.ui.mode);
	const location = useLocation();
	const navigate = useNavigate();

	const logoSrc =
		mode === "light" ? "/images/prism-black.png" : "/images/prism-white.png";

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const handleScroll = (id) => {
		if (location.pathname === "/") {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			navigate(`/#${id}`);
		}
	};

	return (
		<Box
			className="fixed top-0 left-0 right-0 z-50 mt-7"
			style={{
				backgroundImage: "none",
				border: "none",
			}}
		>
			<Container className="max-w-screen-lg">
				<Box className="flex items-center justify-between shrink-0 backdrop-blur-md border rounded-lg p-2 min-h-16"
					style={{
						borderColor: mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
						backgroundColor: mode === "light" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
						boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
					}}
				>
					<Box className="flex-1 flex items-center">
						<img
							src={logoSrc}
							alt="Prism Logo"
							className="mr-2.5"
							style={{
								height: "auto",
								width: "auto",
								maxHeight: "32px",
							}}
						/>
						<Box className="hidden md:flex">
							<Button
								variant="ghost"
								size="lg"
								onClick={() => handleScroll("features")}
								className="text-info"
							>
								Features
							</Button>
							<Button
								variant="ghost"
								size="lg"
								onClick={() => handleScroll("highlights")}
								className="text-info"
							>
								Highlights
							</Button>
							<Button
								variant="ghost"
								size="lg"
								onClick={() => handleScroll("faq")}
								className="text-info"
							>
								FAQ
							</Button>
							<Button
								variant="ghost"
								size="lg"
								href="https://uprock.com/blog"
								className="text-info"
							>
								Blog
							</Button>
						</Box>
					</Box>
					<Box
						className="hidden md:flex gap-1 items-center"
					>
						{/* Placeholder for future auth buttons */}
					</Box>
					<Box
						className="flex md:hidden gap-1"
					>
						<IconButton
							aria-label="Menu button"
							onClick={toggleDrawer(true)}
							variant="ghost"
						>
							<Menu />
						</IconButton>
						<Sheet open={open} onOpenChange={setOpen}>
							<Box className="p-4 bg-background">
								<Box className="flex justify-end">
									<IconButton
										onClick={toggleDrawer(false)}
										variant="ghost"
									>
										<X />
									</IconButton>
								</Box>

								<Box className="py-2 px-3 rounded-md hover:bg-accent text-accent-foreground cursor-pointer">
									Features
								</Box>
								<Box className="py-2 px-3 rounded-md hover:bg-accent text-accent-foreground cursor-pointer">
									Testimonials
								</Box>
								<Box className="py-2 px-3 rounded-md hover:bg-accent text-accent-foreground cursor-pointer">
									Highlights
								</Box>
								<Box className="py-2 px-3 rounded-md hover:bg-accent text-accent-foreground cursor-pointer">
									FAQ
								</Box>
								<Box
									className="py-2 px-3 rounded-md hover:bg-accent text-accent-foreground cursor-pointer"
									component="a"
									href="https://uprock.com/blog"
								>
									Blog
								</Box>
							</Box>
						</Sheet>
					</Box>
					<ThemeSwitch />
				</Box>
			</Container>
		</Box>
	);
};

export default AppAppBar;
