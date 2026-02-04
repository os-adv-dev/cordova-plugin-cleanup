# Cordova Plugin Cleanup

This Cordova plugin allows you to specify a list of file paths to be deleted after the `prepare` phase of the Cordova build process.

## Installation

To install the plugin, run:

```bash
cordova plugin add cordova-plugin-cleanup
```

## Configuration

In your Cordova project's `config.xml`, add a preference to specify the paths of files to delete:

```xml
<preference name="CLEANUP_PATHS" value="path/to/file1.txt,path/to/file2.js,path/to/directory" />
```

- Paths are relative to the project root.
- Separate multiple paths with commas.
- Can include both files and directories.

## How it works

The plugin hooks into the `after_prepare` event and deletes the specified files and directories.

## Example

If you have temporary files generated during build that you want to clean up, add them to the `CLEANUP_PATHS` preference.

Note: Be careful with the paths to avoid deleting important files.