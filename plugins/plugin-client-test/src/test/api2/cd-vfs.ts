/*
 * Copyright 2021 The Kubernetes Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Common, CLI, ReplExpect } from '@kui-shell/test'

/**
 * This test relies on a `/tmpo` mount; see
 * plugin-client-test/src/preload for where we mount `tmpo`.
 * This mount is intentionally named to have a common prefix
 * with the local filesystem entry '/tmp`, so that we can test
 * that Kui correctly combines local and mount VFS.
 *
 */
describe('cd root VFS', function(this: Common.ISuite) {
  before(Common.before(this))
  after(Common.after(this))

  it('should cd into /tmpo', () =>
    CLI.command(`cd /tmpo`, this.app)
      .then(ReplExpect.okWithString('/tmpo'))
      .catch(Common.oops(this, true)))

  it('should ls in /tmpo', () =>
    CLI.command(`ls /tmpo`, this.app)
      .then(ReplExpect.okWithString('D1/'))
      .catch(Common.oops(this, true)))

  it('should cd into D1/', () =>
    CLI.command(`cd D1`, this.app)
      .then(ReplExpect.okWithString('/tmpo/D1'))
      .catch(Common.oops(this, true)))

  it('should cd .. back to /tmpo', () =>
    CLI.command(`cd ..`, this.app)
      .then(ReplExpect.okWithString('/tmpo'))
      .catch(Common.oops(this, true)))

  it('should pwd in /tmpo', () =>
    CLI.command('pwd', this.app)
      .then(ReplExpect.okWithString('/tmpo'))
      .catch(Common.oops(this, true)))

  it('should cd .. back to /', () =>
    CLI.command(`cd ..`, this.app)
      .then(ReplExpect.okWithString('/'))
      .catch(Common.oops(this, true)))

  it('should pwd in /', () =>
    CLI.command('pwd', this.app)
      .then(ReplExpect.okWithString('/'))
      .catch(Common.oops(this, true)))

  it('should cd into /tmpo/D2', () =>
    CLI.command(`cd /tmpo/D2`, this.app)
      .then(ReplExpect.okWithString('/tmpo/D2'))
      .catch(Common.oops(this, true)))

  it('should cd ../.. back to /', () =>
    CLI.command(`cd ..`, this.app)
      .then(ReplExpect.okWithString('/'))
      .catch(Common.oops(this, true)))

  it('should cd - back into /tmpo/D2', () =>
    CLI.command(`cd -`, this.app)
      .then(ReplExpect.okWithString('/tmpo/D2'))
      .catch(Common.oops(this, true)))
})
