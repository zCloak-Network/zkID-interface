export const ZK_PROGRAM = {
  name: 'POAP Issuance Rule',
  hash: '0x5bf2b53b6831c372efcbd0ed2f7149c2997609141b8ff3bdbf692335df0d2e06',
  filed: 'age,class,helmet_rarity,chest_rarity,weapon_rarity',
  // filed: "Age,Class,Helmet,Chest,Weapon",
  detailString:
    'begin repeat.5 read.a end read.a dup.1 push.17 lt.128 repeat.7 roll.8 end read.ab kvalid pick.2 roll.4 swap.2 swap.4 roll.8 drop.1 repeat.5 read.a end read.a dup.1 dup.1 push.1 push.2 roll.4 eq pad.1 swap.2 eq swap.1 drop.1 or if.true push.0 else push.1 end repeat.7 roll.8 end read.ab kvalid repeat.5 roll.8 end repeat.6 read.a end dup.1 repeat.7 roll.8 end read.ab kvalid pad.3 repeat.3 roll.8 end repeat.3 roll.4 drop.1 end swap.1 repeat.6 read.a end dup.1 repeat.7 roll.8 end read.ab kvalid swap.2 pad.3 roll.8 repeat.3 swap.1 drop.1 end repeat.6 read.a end dup.1 repeat.7 roll.8 end read.ab kvalid pad.3 repeat.3 roll.8 end repeat.3 roll.4 drop.1 end read.ab read.ab pad.1 repeat.3 roll.8 end roll.4 drop.1 push.5 push.7 khash pad.3 repeat.3 roll.8 end repeat.3 roll.4 drop.1 end add add push.18 lt.128 pad.3 roll.4 roll.8 roll.8 swap.1 push.1 mul swap.1 push.2 mul add swap.1 push.4 mul add roll.4 drop.1 swap.1 drop.1 swap.2 end',
  detail: `begin
    repeat.5
        read.a
      end
      read.a dup.1 push.17 lt.128
      repeat.7
        roll.8
      end
      read.ab kvalid pick.2 roll.4 swap.2 swap.4 roll.8 drop.1

      repeat.5
        read.a
      end
      read.a dup.1 dup.1 push.1 push.2 roll.4 eq pad.1 swap.2 eq swap.1 drop or
      if.true
        push.0
      else
        push.1
      end

      repeat.7
        roll.8
      end
      read.ab kvalid
      repeat.5
        roll.8
      end

      repeat.6
        read.a
      end
      dup.1

      repeat.7
        roll.8
      end
      read.ab kvalid

      pad.3
      repeat.3
        roll.8
      end
      repeat.3
      roll.4 drop.1
      end

      swap.1
      repeat.6
        read.a
      end
      dup.1
      repeat.7
        roll.8
      end
      read.ab kvalid

      swap.2

      pad.3 roll.8
      repeat.3
        swap.1 drop.1
      end

      repeat.6
        read.a
      end
      dup.1
      repeat.7
        roll.8
      end
      read.ab kvalid

      pad.3
      repeat.3
        roll.8
      end
      repeat.3
        roll.4 drop.1
      end
      read.ab read.ab
      pad.1
      repeat.3
        roll.8
      end
      roll.4 drop.1 push.5 push.7
      khash

      pad.3
      repeat.3
        roll.8
      end
      repeat.3
        roll.4 drop.1
      end
      add add push.18 lt.128

      pad.3 roll.4 roll.8 roll.8 swap.1
      push.1 mul swap.1 push.2 mul add swap.1 push.4 mul add
      roll.4 drop.1 swap.1 drop.1 swap.2
 end
`
};
