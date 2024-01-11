"use client"

import { useTheme } from "next-themes"

const Logo = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return isDark ? (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 11.2273V16.5455H5.31818C8.25533 16.5455 10.6364 14.1644 10.6364 11.2273C10.6364 8.29012 8.25533 5.90909 5.31818 5.90909C2.38103 5.90909 0 8.29012 0 11.2273Z"
        fill="url(#paint0_linear_11_123)"
      />
      <path
        d="M0.0424435 7.42953C1.22277 5.79273 3.14605 4.72727 5.31818 4.72727C8.90803 4.72727 11.8182 7.63742 11.8182 11.2273C11.8182 13.3994 10.7527 15.3227 9.11592 16.503C13.2888 16.0806 16.5455 12.557 16.5455 8.27273C16.5455 3.70383 12.8416 0 8.27273 0C3.98848 0 0.464871 3.25669 0.0424435 7.42953Z"
        fill="url(#paint1_linear_11_123)"
      />
      <path
        d="M0 11.2273C0 8.29012 2.38103 5.90909 5.31818 5.90909C8.25533 5.90909 10.6364 8.29012 10.6364 11.2273C10.6364 14.1644 8.25533 16.5455 5.31818 16.5455H0V11.2273Z"
        fill="white"
        fillOpacity="0.8"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11_123"
          x1="8.27273"
          y1="0"
          x2="8.27273"
          y2="16.5455"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C6C6C6" />
          <stop offset="1" stopColor="#BFBFBF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11_123"
          x1="8.27273"
          y1="0"
          x2="8.27273"
          y2="16.5455"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C6C6C6" />
          <stop offset="1" stopColor="#BFBFBF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.727295 11.9546V17.2727H6.04548C8.98263 17.2727 11.3637 14.8917 11.3637 11.9546C11.3637 9.01742 8.98263 6.63639 6.04548 6.63639C3.10833 6.63639 0.727295 9.01742 0.727295 11.9546Z"
        fill="url(#paint0_linear_11_134)"
      />
      <path
        d="M0.769738 8.15682C1.95006 6.52002 3.87334 5.45457 6.04548 5.45457C9.63533 5.45457 12.5455 8.36472 12.5455 11.9546C12.5455 14.1267 11.48 16.05 9.84322 17.2303C14.0161 16.8079 17.2727 13.2843 17.2727 9.00002C17.2727 4.43112 13.5689 0.727295 9.00002 0.727295C4.71577 0.727295 1.19217 3.98398 0.769738 8.15682Z"
        fill="url(#paint1_linear_11_134)"
      />
      <path
        d="M0.727295 11.9546C0.727295 9.01742 3.10833 6.63639 6.04548 6.63639C8.98263 6.63639 11.3637 9.01742 11.3637 11.9546C11.3637 14.8917 8.98263 17.2727 6.04548 17.2727H0.727295V11.9546Z"
        fill="url(#paint2_radial_11_134)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11_134"
          x1="9.00002"
          y1="0.727295"
          x2="9.00002"
          y2="17.2727"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#71717A" />
          <stop offset="1" stopColor="#71717A" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11_134"
          x1="9.00002"
          y1="0.727295"
          x2="9.00002"
          y2="17.2727"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#71717A" />
          <stop offset="1" stopColor="#71717A" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint2_radial_11_134"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(6.04548 11.9545) rotate(90) scale(5.31818)"
        >
          <stop stopColor="#1C1917" />
          <stop offset="1" stopColor="#1C1917" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default Logo
