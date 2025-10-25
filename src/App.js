import { Console, Random } from "@woowacourse/mission-utils";

class App {
  async run() {
    const nameString = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분)"
    );
    const nameSet = this.parseName(nameString);
    const iterateStr = await Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?"
    );
    const iterateNum = Number(iterateStr);

    const startPostion = this.initCarPosition(nameSet);

    for (let i = 0; i < iterateNum; i++) {
      this.moveCar(startPostion);
      this.roundPrint(startPostion);
    }
  }

  parseName(input) {
    const names = input.split(",").map((name) => name.trim());

    const carSet = new Set();
    for (const name of names) {
      carSet.add(name);
    }

    return carSet;
  }

  initCarPosition(nameSet) {
    const currentPos = new Map();
    for (const name of nameSet) {
      currentPos.set(name, 0);
    }
    return currentPos;
  }

  moveCar(currentPos) {
    for (const [name, pos] of currentPos) {
      if (this.checkMove()) {
        currentPos.set(name, pos + 1);
      }
    }
  }

  checkMove() {
    const tmpNum = Random.pickNumberInRange(0, 9);
    return tmpNum >= 4;
  }

  roundPrint(currentPos) {
    for (const [name, pos] of currentPos) {
      Console.print(`${name} : ${"-".repeat(pos)}`);
    }
    Console.print("\n");
  }
}

export default App;
