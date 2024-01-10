export default function HeadlineOption() {
  return (
    <div className="flex flex-col gap-2">
      <div>Headline Options</div>
      {/* 1. Fetch last 5 articles from the API or our test JSON.
            2. Map over the five, grabbing their headline
            3. Using split() or another string method breakout the individual words. This should produce an array, such as [House, Passes, Abortion, Bill] from House Passes Abortion Bill.
            4. Use concat() or another array method to combine the 5 arrays.
            5. map througgh our new array (containing all words from the five headlines) and assign each word a unique id and then find a way to mix up or randomize the list.
            6. display the list   */}
      {/* Edge cases: special characters, punctuation, hyphenated words */}
    </div>
  );
}
