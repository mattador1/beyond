## Getting Started

First do npm install to download dependecies

```bash
npm install
```

After, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions

- N/A or empty field was also talken into consideration if those fields are country or category (example: "" as category was used to calculate top inflencer)
- Numbers are in 2.3M or 1.3K or 40 format
- Parsing of numbers were done but were not reverted back to 1.4M style. Tables show full view of users with all data, not only associated name
- When estimating top influencer per category we take into account both Category1 and Category2

## Next steps

- Would be good to be more generic, so that there is possibility for every CSV data source with defined headers to be able to perform queries and get top statistics for any column (any column which will be added in the future)
- So for example get top user per X by Y, assuming that statement make sense depending on data.
- This could be done more like moving through the matrix, with i, j indexes as positions, user would input X and Y as named header we would mapped them as j (column positions) and then perform calculation. Prior to calculating data should be parsed but this can be also done if we know what data represents and that in the future will be consistent.

## Step after next step

- 10x or 100x data muliple? - I would say that we would need to start streaming data and processing them in chunks so that once we find top user, we do a snapshot and compare with new chunk which arrived.
- Increasing it even further we should be thinking of processing it on database level or apply some message broker to help us with the load and to start creating optimized data structures in specific databases for fast queries.
