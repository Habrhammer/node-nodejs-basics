const parseEnv = () => {
  const args = process.argv.slice(2);
  const result = args.reduce((acc, curr, index, array) => {
    if (index % 2 === 0) {
      let key = curr.startsWith("--") ? curr.slice(2) : curr;
      const value = array[index + 1] || "";
      acc.push(`RSS_${key}=${value}`);
    }
    return acc;
  }, []);

  const output = result.join("; ");
  console.log(output);
};

parseEnv();
