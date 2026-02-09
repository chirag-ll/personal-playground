'use client';

import { useState } from "react";
import {data} from './day_3_input';


export default function AdventCode() {
    const [answer, setAnswer] = useState();
    const [bigAnswer, setBigAnswer] = useState();

    // const getJoltage = () => {
    //     // For each bank (string of digits) find the maximum two-digit
    //     // number that can be formed by choosing digits at positions i<j
    //     // (tens = digit at i, ones = digit at j). Use a suffix max to
    //     // get the best ones digit to the right of each tens candidate.
    //     const jolts = data.map((item) => {
    //         const ds = item.toString();
    //         let best = -1;

    //         // Build suffix max array: suffixMax[i] = max digit in positions i+1..end
    //         const suffixMax = new Array(ds.length).fill(-1);
    //         let curMax = -1;
    //         for (let p = ds.length - 1; p >= 0; p--) {
    //             suffixMax[p] = curMax;
    //             const d = parseInt(ds[p], 10);
    //             if (!Number.isNaN(d) && d > curMax) curMax = d;
    //         }
    //         console.log('suffixMax:', suffixMax);

    //         // For each possible tens position (can't be the last char)
    //         for (let i = 0; i < ds.length - 1; i++) {
    //             const tens = parseInt(ds[i], 10);
    //             const ones = suffixMax[i];
    //             if (Number.isNaN(tens) || ones === -1) continue;
    //             const candidate = tens * 10 + ones;
    //             if (candidate > best) best = candidate;
    //         }

    //         // Fallback (shouldn't happen for valid input) — return 0
    //         return (best >= 0 ? best.toString() : '0');
    //     });

    //     const sum = jolts.reduce((acc, val) => acc + parseInt(val, 10), 0);
    //     console.log('per-bank maxes:', jolts);
    //     console.log('Sum:', sum);

    //     setAnswer(sum.toString());

    //     const bigJolts = data.map((item) => {

    //                 // Helper to compare two numeric strings (as numbers, not lexicographically)
    //         const compareNumericStrings = (a, b) => {
    //             if (a.length !== b.length) return a.length - b.length;
    //                 return a.localeCompare(b, undefined, { numeric: true });
    //         };

    //         const ds = item.toString();
            
    //         // Find the maximum 12-digit number by selecting 12 digits
    //         // at distinct indices i1 < i2 < ... < i12
    //         // Use dynamic programming: dp[i][k] = max (k)-digit number using indices <= i
            
    //         const n = ds.length;
    //         const k = 12; // target number of digits
            
    //         if (n < k) return '0'; // not enough digits
            
    //         // dp[i][j] = largest j-digit number using digits from index 0..i-1
    //         // We'll store as a string (or number if it fits)
    //         const dp = Array(n + 1)
    //             .fill(null)
    //             .map(() => Array(k + 1).fill(null));
            
    //         // Base case: 0 digits selected = ""
    //         for (let i = 0; i <= n; i++) {
    //             dp[i][0] = '';
    //         }
            
    //         // Fill DP table
    //         for (let i = 1; i <= n; i++) {
    //             const digit = ds[i - 1];
    //             for (let j = 1; j <= k; j++) {
    //                 // Option 1: don't take digit at index i-1
    //                 if (dp[i - 1][j] !== null) {
    //                     dp[i][j] = dp[i - 1][j];
    //                 }
    //                 // Option 2: take digit at index i-1 (if we have room)
    //                 if (j > 0 && dp[i - 1][j - 1] !== null) {
    //                     const candidate = dp[i - 1][j - 1] + digit;
    //                     if (dp[i][j] === null || compareNumericStrings(candidate, dp[i][j]) > 0) {
    //                         dp[i][j] = candidate;
    //                     }
    //                 }
    //             }
    //         }
            
    //         return dp[n][k] !== null ? dp[n][k] : '0';
    //     });

    //     const bigSum = bigJolts.reduce((acc, val) => acc + BigInt(val), 0n);
    //     setBigAnswer(bigSum.toString());

    // };

    return (
        <div className="container">
            <h1>Total Joltage</h1>
            {/* <button onClick={getJoltage}>Submit</button> */}
            <p>2 digit: {answer}</p>
            <p>12 digit: {bigAnswer}</p>
            <style jsx>{`
                .container {
                    background-color: white;
                    color: black;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    font-family: Arial, sans-serif;
                }`}
                    </style>
        </div>
    )
}