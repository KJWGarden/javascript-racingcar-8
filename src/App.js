import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const nameString = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분)"
    );
    const nameSet = this.parseName(nameString);
    Console.print(nameSet);
  }
  parseName(input) {
    const names = input.split(",").map((name) => name.trim());
    return names;
  }
}

export default App;
