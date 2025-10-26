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
    this.checkWinner(startPostion);
  }

  parseName(input) {
    if (!input || input.trim() === "") {
      throw new Error("[ERROR] 자동차 이름을 입력해야 합니다.");
    }

    if (!input.includes(",") && input.trim().includes(" ")) {
      throw new Error("[ERROR] 자동차 이름은 쉼표(,)로만 구분해야 합니다.");
    }
    if (/[^a-zA-Z0-9,ㄱ-ㅎㅏ-ㅣ가=힣\s]/.test(input)) {
      throw new Error("[ERROR] 자동차 이름은 쉼표(,)로만 구분해야 합니다.");
    }

    const names = input.split(",").map((name) => name.trim());

    const carSet = new Set();
    for (const name of names) {
      if (name === "") {
        throw new Error("[ERROR] 자동차 이름은 비어 있을 수 없습니다.");
      }

      if (name.length > 5) {
        throw new Error("[ERROR] 자동차 이름은 5자 이하만 가능합니다.");
      }

      if (carSet.has(name)) {
        throw new Error("[ERROR] 자동차 이름은 중복될 수 없습니다.");
      }

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

  checkWinner(currentPos) {
    let initPos = 0;
    for (const [name, pos] of currentPos) {
      if (pos > initPos) {
        initPos = pos;
      }
    }

    const winners = [];
    for (const [name, pos] of currentPos) {
      if (pos === initPos) {
        winners.push(name);
      }
    }
    Console.print(`최종 우승자 : ${winners.join(",")}`);
  }
}

export default App;
