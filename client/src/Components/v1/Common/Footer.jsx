import * as React from "react";
import { Box } from "@/Components/v3/ui";
import { Container } from "@/Components/v3/ui";
import { IconButton } from "@/Components/v3/ui";
import { Link } from "@/Components/v3/ui";
import { Stack } from "@/Components/v3/ui";
import { Typography } from "@/Components/v3/ui";
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

function Copyright() {
	return (
		<Typography className="text-muted-foreground mt-1">
			{"Copyright © "}
			<Link
				className="text-muted-foreground hover:text-foreground"
				href="https://prism.uprock.com/"
			>
				UpRock
			</Link>
			&nbsp;
			{new Date().getFullYear()}
		</Typography>
	);
}

export default function Footer() {
	return (
		<Container
			className="flex flex-col items-center gap-4 sm:gap-8 py-24 px-12 text-center md:text-left"
		>
			<Box
				className="flex justify-between pt-4 sm:pt-8 w-full border-t"
			>
				<div>
					<Link
						className="text-muted-foreground hover:text-foreground"
						href="https://uprock.com/privacy-policy"
					>
						Privacy Policy
					</Link>
					<Typography className="inline-block mx-2 opacity-50">
						•
					</Typography>
					<Link
						className="text-muted-foreground hover:text-foreground"
						href="https://uprock.com/terms-of-use"
					>
						Terms of Service
					</Link>
					<Copyright />
				</div>
				<Stack
					direction="row"
					spacing={1}
					className="justify-start text-muted-foreground"
				>
					<IconButton
						variant="ghost"
						size="sm"
						href="mailto:prism@uprock.com?subject=Interested%20in%20UpRock%20Prism"
						aria-label="Contact Us"
						className="self-center"
					>
						<FaEnvelope />
					</IconButton>
					<IconButton
						variant="ghost"
						size="sm"
						href="https://facebook.com/uprockcom"
						aria-label="Facebook"
						className="self-center"
					>
						<FaFacebook />
					</IconButton>
					<IconButton
						variant="ghost"
						size="sm"
						href="https://x.com/uprockcom"
						aria-label="X"
						className="self-center"
					>
						<FaTwitter />
					</IconButton>
					<IconButton
						variant="ghost"
						size="sm"
						href="https://www.linkedin.com/company/uprock/"
						aria-label="LinkedIn"
						className="self-center"
					>
						<FaLinkedin />
					</IconButton>
					<IconButton
						variant="ghost"
						size="sm"
						href="https://github.com/uprockcom"
						aria-label="GitHub"
						className="self-center"
					>
						<FaGithub />
					</IconButton>
				</Stack>
			</Box>

			<Box
				className="flex flex-col items-center mt-4"
			>
				<Typography
					variant="h2"
					className="text-muted-foreground"
				>
					Made with ❤️ by&nbsp;
					<Link
						href="https://uprock.com"
						className="text-foreground hover:text-primary mx-1"
					>
						UpRock&nbsp;
					</Link>
					&&nbsp;
					<Link
						href="https://bluewavelabs.ca"
						className="text-foreground hover:text-primary mx-1"
					>
						Bluewave Labs
					</Link>
				</Typography>
				<Box
					className="flex items-center mt-2"
				>
					<Typography
						variant="h2"
						className="text-muted-foreground mr-1"
					>
						Built on&nbsp;
					</Typography>
					<svg
						id="Layer_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 397.7 311.7"
						xmlSpace="preserve"
						width="15"
						height="15"
					>
						<style type="text/css">
							{`.st0{fill:url(#SVGID_1_);}
                .st1{fill:url(#SVGID_2_);}
                .st2{fill:url(#SVGID_3_);}`}
						</style>
						<linearGradient
							id="SVGID_1_"
							gradientUnits="userSpaceOnUse"
							x1="360.8791"
							y1="351.4553"
							x2="141.213"
							y2="-69.2936"
							gradientTransform="matrix(1 0 0 -1 0 314)"
						>
							<stop
								offset="0"
								style={{ stopColor: "rgb(0, 255, 163)" }}
							/>
							<stop
								offset="1"
								style={{ stopColor: "rgb(220, 31, 255)" }}
							/>
						</linearGradient>
						<path
							className="st0"
							d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"
						/>
						<linearGradient
							id="SVGID_2_"
							gradientUnits="userSpaceOnUse"
							x1="264.8291"
							y1="401.6014"
							x2="45.163"
							y2="-19.1475"
							gradientTransform="matrix(1 0 0 -1 0 314)"
						>
							<stop
								offset="0"
								style={{ stopColor: "rgb(0, 255, 163)" }}
							/>
							<stop
								offset="1"
								style={{ stopColor: "rgb(220, 31, 255)" }}
							/>
						</linearGradient>
						<path
							className="st1"
							d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"
						/>
						<linearGradient
							id="SVGID_3_"
							gradientUnits="userSpaceOnUse"
							x1="312.5484"
							y1="376.688"
							x2="92.8822"
							y2="-44.061"
							gradientTransform="matrix(1 0 0 -1 0 314)"
						>
							<stop
								offset="0"
								style={{ stopColor: "rgb(0, 255, 163)" }}
							/>
							<stop
								offset="1"
								style={{ stopColor: "rgb(220, 31, 255)" }}
							/>
						</linearGradient>
						<path
							className="st2"
							d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4 c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"
						/>
					</svg>
					<Typography
						variant="h2"
						sx={{ color: "text.secondary", ml: 1 }}
					>
						&nbsp;Solana
					</Typography>
				</Box>
			</Box>
		</Container>
	);
}
